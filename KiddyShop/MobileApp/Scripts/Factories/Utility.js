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