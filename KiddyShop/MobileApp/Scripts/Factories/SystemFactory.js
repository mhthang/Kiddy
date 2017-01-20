var SystemFactory = function ($rootScope, $state, $timeout, HTTPFactory, ErrorLogFactory, LocalFileFactory, LocalStorageFactory) {
    var factory = {};
    var URL = "System/";

    var getMenuList = function (callback) {
        if (!$rootScope.global.isLoadingMenu) {
            $rootScope.global.isLoadingMenu = true;

            HTTPFactory.sendRequestToServer({
                url: URL + "GetMenuList",

                callback: function (response) {
                    if (response) {
                        $rootScope.global.menuList = response;
                    }

                    $rootScope.global.isLoadingMenu = false;
                    callback(response);
                }
            });
        }
    }

    var saveDeviceInfo = function (callback) {
        if ($rootScope.global.device) {
            HTTPFactory.sendRequestToServer({
                url: URL + "SaveDeviceInfo",

                data: {
                    objDevice: $rootScope.global.device
                },

                callback: callback
            });
        }
    }

    var saveUserData = function (callback) {
        var fileContent = JSON.stringify($rootScope.global.account);
        LocalFileFactory.createFile(LOCAL_FILE_ACCOUNT_FOLDER, LOCAL_FILE_ACCOUNT_DATA, fileContent, callback);
    }

    var getCurrentScriptVersion = function (callback, getFromServer) {
        var bundleList = LocalStorageFactory.getObject(LOCAL_STORAGE_ALL_BUNDLE);

        if (bundleList && !getFromServer) {
            callback(bundleList);
        } else {
            var xhttp = new XMLHttpRequest();

            xhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    callback(JSON.parse(this.responseText));
                } else {
                    callback([]);
                }
            };

            xhttp.open("GET", "version.txt?v=" + new Date().getSeconds(), true);
            xhttp.send();
        }
    }

    // Cập nhật cache bundle version và load lại web
    var updateServerBundleVersionCacheAndReload = function (serverBundleVersionList) {
        HTTPFactory.sendRequestToServer({
            url: URL + "SetNewBundleVersions",

            data: {
                arrBundleVersion: serverBundleVersionList
            },

            callback: function (response) {
                if (response) {
                    window.location = URL_PGAPP_WEB;
                }
            }
        });
    }

    var setCurrentScriptVersion = function (response) {
        $rootScope.global.allBundleVersion = response;
        LocalStorageFactory.setObject(LOCAL_STORAGE_ALL_BUNDLE, $rootScope.global.allBundleVersion);
    }

    var checkAndUpdateScriptVersion = function (callback) {
        getCurrentScriptVersion(function (response) {
            if (response) {
                setCurrentScriptVersion(response);

                for (var i = 0; i < response.length; ++i) {
                    var serverBundleVersion = response[i];
                    var found = false;

                    for (var j = 0; j < $rootScope.global.allBundleVersion.length; ++j) {
                        var clientBundleVersion = $rootScope.global.allBundleVersion[j];

                        if (clientBundleVersion.Bundle == serverBundleVersion.Bundle) {
                            // Nếu phiên bản hiện tại của client < server thì cập nhật
                            if (clientBundleVersion.Version < serverBundleVersion.Version) {
                                updateServerBundleVersionCacheAndReload(response);
                                callback(true);
                                return;
                            }

                            found = true;
                            break;
                        }
                    }

                    // Nếu không tìm thấy bundle client tương ứng bundle server -> server có bundle mới -> cập nhật
                    if (!found) {
                        updateServerBundleVersionCacheAndReload(response);
                        callback(true);
                        return;
                    }
                }

                callback(false);
            }

            callback(false);
        }, true);
    }

    var installAPK = function (entry) {
        window.plugins.webintent.startActivity({
            action: window.plugins.webintent.ACTION_VIEW,
            url: entry.toURL(),
            type: "application/vnd.android.package-archive"
        },

        function () {
        },

        function () {
        });

        // Tắt ứng dụng
        navigator.app.exitApp();
    }

    var updateAndroid = function () {
        // Tải file APK
        var installFileURL = URL_INSTALL_FILE_PATH + "android/" + INSTALL_FILE_NAME + ".apk";
        var fileTransfer = new FileTransfer();

        fileTransfer.onprogress = function (progressEvent) {
            if (progressEvent.lengthComputable) {
                $rootScope.global.downloadProgress = Math.round(progressEvent.loaded * 100 / progressEvent.total);
            } else if ($rootScope.downloadProgress < 100) {
                $rootScope.global.downloadProgress = $scope.uploadPercent + 1;
            }
        };

        $rootScope.global.isUpdatingApp = true;
        $state.go("app.updateapp");

        fileTransfer.download(encodeURI(installFileURL), "cdvfile://localhost/persistent/mwg/apk/mwg.apk",
            function (entry) {
                // Sau khi tải xong file thì cài file
                installAPK(entry);
            },

            function (error) {
                ErrorLogFactory.addErrorLog("Lỗi tải file APK", error, "updateAndroid", "SystemFactory");
            },

            true);
    }

    var updateApp = function () {
        $rootScope.global.installGuideURL = URL_INSTALL_GUIDE + $rootScope.global.device.PlatformID + ".jpg";

        switch ($rootScope.global.device.PlatformID) {
            case 1:
                // iOS chỉ việc đưa đường dẫn file là tự động hỏi muốn cài không
                var installURL = "itms-services://?action=download-manifest&url=" + URL_INSTALL_FILE_PATH + "ios/" + INSTALL_FILE_NAME + ".plist";
                window.open(installURL, "_system");
                break;

            case 2:
                updateAndroid();
                break;

            default:
                break;
        }
    }

    var checkAndUpdateApp = function (callback) {
        HTTPFactory.sendRequestToServer({
            url: URL + "GetAppVersion",

            callback: function (response) {
                if (response) {
                    var serverVersion = String(response).substring(1);
                    serverVersion = S(serverVersion).replaceAll(".", "");

                    cordova.getAppVersion(
                        function (version) {
                            $timeout(function () {
                                var clientVersion = version.substring(1);
                                clientVersion = S(clientVersion).replaceAll(".", "");

                                if (clientVersion < serverVersion) {
                                    updateApp();
                                    callback(true);
                                } else {
                                    callback(false);
                                }
                            })
                        },

                        function (error) {
                            ErrorLogFactory.addErrorLog("Lỗi lấy phiên bản app client", error, "checkAndUpdateApp", "SystemFactory");
                            callback(false);
                        });
                } else {
                    callback(false);
                }
            }
        });
    }

    factory.setScriptVersion = function (callback) {
        getCurrentScriptVersion(function (response) {
            if (response) {
                setCurrentScriptVersion();
            }
        });
    }

    factory.checkAndUpdateScriptAndApp = function (callback) {
        // Ưu tiên update app, nếu không cần update app thì mới kiểm tra update script
        checkAndUpdateApp(function (response) {
            // false -> không update app, tiếp tục kiểm tra phiên bản script
            if (!response) {
                checkAndUpdateScriptVersion(callback);
            }
        });
    }

    factory.checkAndUpdateApp = function (callback) {
        checkAndUpdateApp(callback);
    }

    factory.getMenuList = function (callback) {
        getMenuList(callback);
    }

    factory.loginSuccess = function (response) {
        $rootScope.global.account = response;
        saveUserData(function () { });
        saveDeviceInfo(function () { });
        getMenuList(function () { });
    }

    $rootScope.$on("GetMenuList", function () {
        getMenuList(function () { });
    });

    return factory;
}

SystemFactory.$inject = ["$rootScope", "$state", "$timeout", "HTTPFactory", "ErrorLogFactory", "LocalFileFactory", "LocalStorageFactory"];