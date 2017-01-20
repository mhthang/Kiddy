var AccountFactory = function (HTTPFactory, LocalFileFactory, $state) {
    var factory = {};
    var URL = "Account/";

    factory.autoLogIn = function (callback) {
        LocalFileFactory.readFile(LOCAL_FILE_ACCOUNT_FOLDER + "/" + LOCAL_FILE_ACCOUNT_DATA, function (response) {
            if (response) {
                var account = JSON.parse(response);

                HTTPFactory.sendRequestToServer({
                    url: URL + "AutoLogIn",

                    data: {
                        objAccount: account
                    },

                    callback: callback
                });
            } else {
                $state.go("app.login");
            }
        });
    }

    return factory;
};

AccountFactory.$inject = ["HTTPFactory", "LocalFileFactory", "$state"]
var DeviceFactory = function ($rootScope, $ionicPopup, $state, $timeout, CameraFactory, AccountFactory, SystemFactory, PopupFactory) {
    var factory = {};
    factory.backButtonCount = 0;

    var setAppVersionAndDeviceInfo = function () {
        if (window.device) {
            $rootScope.global.device = {};
            $rootScope.global.device.UUID = window.device.uuid;
            $rootScope.global.device.PlatformVersion = window.device.platform;
            $rootScope.global.device.IMEI = window.device.imei;
            $rootScope.global.device.DeviceName = window.device.marketingname;
            $rootScope.global.device.Model = window.device.model;
            $rootScope.global.device.Manufacturer = window.device.manufacturer;

            switch (window.device.platform.toLowerCase()) {
                case "ios":
                    $rootScope.global.device.PlatformID = 1;
                    break;

                case "android":
                    $rootScope.global.device.PlatformID = 2;
                    break;

                default:
                    break;
            }

            cordova.getAppVersion(function (version) {
                $rootScope.global.device.AppVersion = version;
            });

            $rootScope.global.localFilePath = "";

            if ($rootScope.global.device.PlatformID == 1) {
                $rootScope.global.localFilePath = "NoCloud/";
            }

            $rootScope.global.localFilePath += "PGApp";
        }
    }

    //#region Event

    var onResume = function () {
        SystemFactory.checkAndUpdateScriptAndApp(function () { });
    };

    var onBackKeyDown = function () {
        if ($rootScope.global.currentLocation == "app/login") {
            navigator.app.exitApp();
        }

        ++factory.backButtonCount;

        $timeout(function () {
            factory.backButtonCount = 0;
        }, 3000);

        // Trong 3 giây mà bấm nút back 2 lần thì hiểu là muốn thoát app
        if (factory.backButtonCount == 2) {
            PopupFactory.confirm("Bạn có chắc muốn đóng ứng dụng?", function (res) {
                if (res) {
                    navigator.app.exitApp();
                } else {
                    factory.backButtonCount = 0;
                }
            });
        } else if (CameraFactory.cameraMode) {
            CameraFactory.cameraMode = false;
        } else {
            navigator.app.backHistory();
        }
    }

    var onOffline = function () {
        $rootScope.global.isOnline = false;
    };

    var onOnline = function () {
        $rootScope.global.isOnline = true;
    };

    var addEventListeners = function () {
        document.addEventListener("resume", onResume, false);
        document.addEventListener("offline", onOffline, false);
        document.addEventListener("online", onOnline, false);
        document.addEventListener("backbutton", onBackKeyDown, false);
    }

    var onDeviceReady = function () {
        $rootScope.global.isInitialising = true;

        SystemFactory.checkAndUpdateApp(function (response) {
            navigator.splashscreen.hide();

            // false -> không update app, chạy tiếp
            if (!response) {
                addEventListeners();
                setAppVersionAndDeviceInfo();

                if (navigator.connection.type != Connection.UNKNOWN && navigator.connection.type != Connection.NONE) {
                    $rootScope.global.isOnline = true;
                }

                AccountFactory.autoLogIn(function (response) {
                    if (response) {
                        SystemFactory.loginSuccess(response);
                        $state.go("app.home");
                    } else {
                        $state.go("app.login");
                    }

                    $rootScope.global.isInitialising = false;
                });
            }
        });
    };

    //#endregion

    factory.initialise = function () {
        document.addEventListener("deviceready", onDeviceReady, false);
    }

    return factory;
}

DeviceFactory.$inject = ["$rootScope", "$ionicPopup", "$state", "$timeout", "CameraFactory", "AccountFactory", "SystemFactory", "PopupFactory"];
var LoginFactory = function (HTTPFactory) {
    var factory = {};
    var URL = "Login/";

    factory.logOut = function (callback) {
        HTTPFactory.sendRequestToServer({
            url: URL + "LogOut",
            callback: callback
        });
    }

    factory.getPGGroupList = function (callback) {
        HTTPFactory.sendRequestToServer({
            url: URL + "GetPGGroupList",
            callback: callback
        });
    }

    factory.logIn = function (username, password, callback) {
        HTTPFactory.sendRequestToServer({
            url: URL + "ManualLogIn",

            data: {
                strUserName: username,
                strPassword: password
            },

            callback: callback,

            noAlert: true
        });
    }

    return factory;
};

LoginFactory.$inject = ["HTTPFactory"];
var ProfileFactory = function (HTTPFactory) {
    var factory = {};
    var URL = "Profile/";

    factory.changeAvatar = function (imageData, callback) {
        HTTPFactory.sendRequestToServer({
            url: URL + "ChangeAvatar",

            data: {
                strImageData: imageData
            },

            callback: callback
        });
    }

    factory.rotate = function (type, callback) {
        HTTPFactory.sendRequestToServer({
            url: URL + "Rotate",

            data: {
                intType: type
            },

            callback: callback
        });
    }

    factory.setNewPassword = function (oldPassword, newPassword, callback) {
        HTTPFactory.sendRequestToServer({
            url: URL + "SetNewPassword",

            data: {
                strOldPassword: oldPassword,
                strNewPassword: newPassword
            },

            callback: callback
        });
    }

    return factory;
};

ProfileFactory.$inject = ["HTTPFactory"]
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
var LocalStorageFactory = function ($window) {
    var factory = {
        set: function (key, value) {
            $window.localStorage[key] = value;
        },

        get: function (key, defaultValue) {
            return $window.localStorage[key] || defaultValue;
        },

        setObject: function (key, value) {
            $window.localStorage[key] = JSON.stringify(value);
        },

        getObject: function (key) {
            try {
                var temp = $window.localStorage[key];

                if (temp) {
                    return JSON.parse(temp || "{}");
                }
            } catch (e) {
                return JSON.parse("{}");
            }
        },

        remove: function (key) {
            $window.localStorage.removeItem(key);
        },

        clear: function () {
            $window.localStorage.clear();
        }
    };

    return factory;
};

LocalStorageFactory.$inject = ["$window"];

var ErrorLogFactory = function ($rootScope, $timeout, $filter, LocalStorageFactory) {
    var factory = {};
    const SEND_INTERVAL = 60000;

    var getErrorList = function () {
        var errorList = LocalStorageFactory.getObject(LOCAL_STORAGE_ERROR_LIST);

        if (!errorList) {
            errorList = [];
        }

        return errorList;
    }

    var sendErrorListToServer;

    sendErrorListToServer = function () {
        var errorList = getErrorList();

        if (errorList.length > 0) {
            LocalStorageFactory.remove(LOCAL_STORAGE_ERROR_LIST);

            var data = JSON.stringify({
                arrErrorLog: errorList
            });

            $.ajax({
                url: "ErrorLog/AddErrorLog",
                type: "POST",
                timeout: 60000,
                cache: true,
                crossDomain: true,
                contentType: "application/json; charset=utf-8;",
                dataType: "json",
                data: data,
                async: true,
                processData: true,
                beforeSend: function () { },

                success: function (response) {
                    if (response == "error") {
                        var currentErrorList = getErrorList();
                        currentErrorList = _.concat(currentErrorList, errorList);
                        LocalStorageFactory.setObject(LOCAL_STORAGE_ERROR_LIST, currentErrorList);
                        $timeout(sendErrorListToServer, SEND_INTERVAL);
                    }
                },

                error: function (error) {
                    console.log(JSON.stringify(error));
                    $timeout(sendErrorListToServer, SEND_INTERVAL);
                }
            });
        } else {
            $timeout(sendErrorListToServer, SEND_INTERVAL);
        }
    }

    factory.addErrorLog = function (title, content, event, module) {
        var errorList = getErrorList();

        // Nếu nội dung là đối tượng exception của javascript
        if (content.message) {
            content = content.message;
        }

        content = JSON.stringify(content);
        content += "\r\n";
        var now = new Date();
        content += " ---Ngày: " + $filter("date")(now, "dd/MM/yyyy HH:mm:ss");

        var error = {
            Title: title,
            Content: content,
            Event: event,
            Module: module,
            Account: $rootScope.global.account
        };

        errorList.push(error);
        LocalStorageFactory.setObject(LOCAL_STORAGE_ERROR_LIST, errorList);
    }

    factory.sendErrorListToServer = function () {
        sendErrorListToServer();
    }

    return factory;
}

ErrorLogFactory.$inject = ["$rootScope", "$timeout", "$filter", "LocalStorageFactory"];

var LocalFileFactory = function ($rootScope, ErrorLogFactory) {
    var factory = {};

    var addErrorLog = function (title, error, event) {
        ErrorLogFactory.addErrorLog(title, error, event, "LocalFileFactory");
    }

    factory.createFile = function (foldername, filename, content, callback) {
        try {
            window.requestFileSystem(LocalFileSystem.PERSISTENT, 0,
                function (fileSystem) {
                    fileSystem.root.getDirectory(
                            $rootScope.global.localFilePath,

                            {
                                create: true
                            },

                            function (dirEntry) {
                                dirEntry.getDirectory(
                                        foldername,

                                        {
                                            create: true
                                        },

                                        function (dirEntry) {
                                            dirEntry.getFile(
                                                filename,

                                                {
                                                    create: true
                                                },

                                                function (fileEntry) {
                                                    fileEntry.createWriter(
                                                        function (writer) {
                                                            writer.onwrite = function (evt) {
                                                                callback(true);
                                                            };

                                                            writer.write(content);
                                                        },

                                                        function (error) {
                                                            addErrorLog("Lỗi lưu nội dung file", error, "createFile");
                                                            callback(false);
                                                        });
                                                },

                                                function (error) {
                                                    addErrorLog("Lỗi load file", error, "createFile");
                                                    callback(false);
                                                });
                                        },

                                        function (error) {
                                            addErrorLog("Lỗi load folder " + foldername, error, "createFile");
                                            callback(null);
                                        });
                            },

                            function (error) {
                                addErrorLog("Lỗi load folder gốc", error, "createFile");
                                callback(null);
                            });
                },

                function (error) {
                    addErrorLog("Lỗi load plugin lưu file", error, "createFile");
                    callback(false);
                });
        } catch (error) {
            addErrorLog("Lỗi load plugin file", error, "createFile");
            callback(false);
        }
    };

    factory.readFile = function (path, callback) {
        try {
            path = $rootScope.global.localFilePath + "/" + path;

            window.requestFileSystem(LocalFileSystem.PERSISTENT, 0,
                function (fileSystem) {
                    fileSystem.root.getFile(path, null,
                        function (fileEntry) {
                            fileEntry.file(
                                function (file) {
                                    var reader = new FileReader();

                                    reader.onloadend = function (evt) {
                                        callback(evt.target.result);
                                    };

                                    reader.readAsText(file);
                                },

                                function (error) {
                                    addErrorLog("Lỗi đọc file", error, "createFile");
                                    callback(null);
                                });
                        },

                        function (error) {
                            addErrorLog("Lỗi load file", error, "readFile");
                            callback(null);
                        });
                },

                function (error) {
                    addErrorLog("Lỗi load plugin đọc file", error, "readFile");
                    callback(null);
                });
        } catch (error) {
            addErrorLog("Lỗi load plugin file", error, "readFile");
            callback(null);
        }
    };

    factory.deleteFile = function (path, callback) {
        try {
            path = $rootScope.global.localFilePath + "/" + path;

            window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fileSystem) {
                fileSystem.root.getFile(path, null, function (fileEntry) {
                    fileEntry.remove(
                        function (success) {
                            callback(true);
                        },

                        function (error) {
                            addErrorLog("Lỗi xóa file", error, "deleteFile");
                            callback(false);
                        });
                });
            }, function () {
                addErrorLog("Lỗi load plugin đọc file", error, "deleteFile");
                callback(false);
            });
        } catch (error) {
            addErrorLog("Lỗi load plugin file", error, "deleteFile");
            callback(false);
        }
    };

    return factory;
}

LocalFileFactory.$inject = ["$rootScope", "ErrorLogFactory"];

var PopupFactory = function ($ionicPopup) {
    var factory = {};

    const confirmButtons =
        [
                {
                    text: "Bỏ qua",
                    type: "button-light",

                    onTap: function () {
                        return 0;
                    }
                },

                {
                    text: "Đồng ý",
                    type: "button-positive",

                    onTap: function () {
                        return 1;
                    }
                }
        ];

    var showCustomPopUp = function (message, buttons, callback) {
        var popUp = $ionicPopup.show({
            template: message,
            title: "Xác nhận",
            buttons: buttons
        });

        popUp.then(callback);
    }

    // Đóng gói việc tạo nút cho pop up
    factory.getButton = function (text, colorClass, returnValue) {
        var button = {
            text: text,
            type: "button-" + colorClass,

            onTap: function () {
                return returnValue;
            }
        };

        return button;
    }

    // Hiện nhiều nút cho lựa
    factory.selectOption = function (message, buttons, callback) {
        showCustomPopUp(message, buttons, callback);
    }

    factory.confirm = function (message, callback) {
        showCustomPopUp(message, confirmButtons, callback);
    }

    factory.alert = function (message, callback) {
        var alertPopup = $ionicPopup.alert({
            title: "Thông báo",
            template: message
        });

        alertPopup.then(function () {
            if (callback) {
                callback();
            }
        });
    }

    return factory;
}

PopupFactory.$inject = ["$ionicPopup"];

var HTTPFactory = function ($timeout, $rootScope, $ionicPopup, $state, ErrorLogFactory, PopupFactory) {
    var factory = {};

    factory.sendRequestToServer = function (options) {
        // Gán các tham số mặc định
        var timeout = options.timeout;

        if (!timeout) {
            timeout = 120000;
        }

        var sync = options.sync;

        if (sync == null) {
            sync = false;
        }

        var data = options.data;

        if (!data) {
            data = {};
        }

        var callback = options.callback;

        if (!callback) {
            callback = function () { };
        }

        var requestData = JSON.stringify(data);

        // Lấy chuỗi token gửi kèm request để server tự động đăng nhập trong trường hợp hết session
        var token = ""

        if ($rootScope.global.account) {
            token = $rootScope.global.account.Token;
        }

        $.ajax({
            url: options.url,
            type: "POST",
            timeout: timeout,
            cache: true,
            crossDomain: true,
            contentType: "application/json; charset=utf-8;",
            dataType: "json",
            data: requestData,

            headers: {
                "Request-Origin": "PGAPP",
                "Token": token
            },

            async: !sync,
            processData: true,
            beforeSend: function () { },

            success: function (response) {
                $timeout(function () {
                    if (response.LoginError) {
                        PopupFactory.alert(response.LoginError, function (res) {
                            $state.go("app.login");
                        });
                    } else {
                        if (response.ErrorMessage) {
                            if (options.noAlert) {
                                callback(response);
                            } else {
                                PopupFactory.alert(response.ErrorMessage, function (res) {
                                    callback(null);
                                });
                            }
                        } else if (response.DataTable) {
                            callback(JSON.parse(response.DataTable));
                        } else if (response.Result) {
                            callback(response.Result);
                        } else {
                            callback(response);
                        }
                    }
                });
            },

            error: function (XMLHttpRequest, textStatus, errorThrown) {
                $timeout(function () {
                    var content = XMLHttpRequest.responseText;

                    if (S(content).isEmpty()) {
                        content = XMLHttpRequest;
                    }

                    ErrorLogFactory.addErrorLog("Lỗi gửi request tới server", "---error: " + content + " ---requestData: " + requestData, options.url, "HTTPFactory");

                    PopupFactory.alert("Lỗi khi kết nối tới máy chủ, vui lòng kiểm tra lại đường truyền mạng hoặc liên hê IT để được hỗ trợ!", function () {
                        callback(null);
                    });
                });
            }
        });
    }

    return factory;
}

HTTPFactory.$inject = ["$timeout", "$rootScope", "$ionicPopup", "$state", "ErrorLogFactory", "PopupFactory"];

var CameraFactory = function ($timeout, PopupFactory, ErrorLogFactory) {
    var factory = {};

    var addErrorLog = function (title, error, event) {
        ErrorLogFactory.addErrorLog(title, error, event);
    }

    // 1 - Chụp hình, 2 - Chọn hình
    var takePhoto = function (source, callback) {
        try {
            var sourceType;

            if (source == 1) {
                sourceType = Camera.PictureSourceType.CAMERA;
            } else if (source == 2) {
                sourceType = Camera.PictureSourceType.PHOTOLIBRARY;
            }

            navigator.camera.getPicture(function (result) {
                $timeout(function () {
                    callback(result);
                });
            },

            function (error) {
                addErrorLog("Lỗi chụp hình", error, "takePhoto");
            },

            {
                quality: 100,
                destinationType: Camera.DestinationType.DATA_URL,
                sourceType: sourceType,
                encodingType: Camera.EncodingType.JPEG,
                targetWidth: 600,
                targetHeight: 600,
                saveToPhotoAlbum: false,
                correctOrientation: true
            });
        } catch (e) {
            addErrorLog("Lỗi gọi plugin chụp hình", e, "takePhoto");
            alert("Lỗi mở camera");
        }
    }

    // 1 (Mặc định) - chụp hình, 2 - Chọn hình, 3 (Truyền giá trị khác cũng hiểu là 3) - Cả 2
    factory.takePhoto = function (callback, source) {
        try {
            if (!source) {
                source = 1;
            }

            if (source == 3) {
                var buttons = [];
                var takePhotoButton = PopupFactory.getButton("Chụp hình", "positive", 1);
                buttons.push(takePhotoButton);
                var choosePhotoButton = PopupFactory.getButton("Chọn hình", "balanced", 2);
                buttons.push(choosePhotoButton);
                var closeButton = PopupFactory.getButton("Bỏ qua", "light", 3);
                buttons.push(closeButton);

                PopupFactory.selectOption("Bạn muốn chụp hình hay chọn hình?", buttons, function (result) {
                    if (result != 3) {
                        takePhoto(result, callback);
                    } else {
                        callback(null);
                    }
                });
            } else {
                takePhoto(source, callback);
            }
        } catch (e) {
            addErrorLog("Lỗi gọi plugin chụp hình", e, "takePhoto");
            alert("Lỗi mở camera");
        }
    }

    return factory;
}

CameraFactory.$inject = ["$timeout", "PopupFactory", "ErrorLogFactory"];