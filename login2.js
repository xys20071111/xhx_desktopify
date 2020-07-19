var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var login2;
(function (login2) {
    var ViewType;
    (function (ViewType) {
        ViewType[ViewType["NONE"] = 0] = "NONE";
        ViewType[ViewType["INSTERIOR"] = 1] = "INSTERIOR";
        ViewType[ViewType["LOADING"] = 2] = "LOADING";
        ViewType[ViewType["START"] = 3] = "START";
        ViewType[ViewType["SIGNIN"] = 4] = "SIGNIN";
        ViewType[ViewType["SERVER_LIST"] = 5] = "SERVER_LIST";
    })(ViewType || (ViewType = {}));
    /**
     * 登录2.0
     */
    var LoginModule = /** @class */ (function (_super) {
        __extends(LoginModule, _super);
        function LoginModule() {
            return _super.call(this) || this;
        }
        LoginModule.prototype.init = function () {
            this.addPreLoad(xls.load(xls.serverName));
            this.addPreLoad(xls.load(xls.serverMaintenance, true));
            this.addPreLoad(res.load("atlas/selectServer.atlas"));
            this.addPreLoad(res.load('atlas/login2/panel/notice.atlas'));
            this.addPreLoad(res.load('res/json/privacy.txt'));
            this.addPreLoad(xls.load(xls.noticeBoard, true));
            core.SoundManager.instance.playBgm(pathConfig.getBgmUrl('login'), true);
        };
        LoginModule.prototype.addEventListeners = function () {
            BC.addEvent(this, EventManager, globalEvent.BEAN_LOAD_PRO, this, this.updateBar);
            BC.addEvent(this, this.btnChange, Laya.Event.CLICK, this, this.showLogin);
            BC.addEvent(this, this.boxStart, Laya.Event.CLICK, this, this.showLogin);
            BC.addEvent(this, this.boxServer, Laya.Event.CLICK, this, this.onGameLogin);
            BC.addEvent(this, this.btnRegister, Laya.Event.CLICK, this, this.onRegister);
            BC.addEvent(this, this.btnLogin, Laya.Event.CLICK, this, this.onLogin);
            BC.addEvent(this, this.btnInLogin, Laya.Event.CLICK, this, this.onInLogin);
            BC.addEvent(this, this.imgServer, Laya.Event.CLICK, this, this.onShowSrv);
            BC.addEvent(this, this.btnNotice, Laya.Event.CLICK, this, this.showNotice);
            BC.addEvent(this, EventManager, globalEvent.LINK_GETWAY, this, this.onLinkGetway);
            BC.addEvent(this, EventManager, globalEvent.SIGIIN_SUCCESS, this, this.showAccount);
            BC.addEvent(this, EventManager, globalEvent.SELECT_ONE_SERVER, this, this.updateCurSrv);
            BC.addEvent(this, this.txtForget, Laya.Event.CLICK, this, this.onForget);
        };
        LoginModule.prototype.onForget = function () {
            if (Laya.Render.isConchApp) {
                clientCore.NativeMgr.instance.openUrl('https://account.61.com/forget', true);
            }
            else {
                window.open('https://account.61.com/forget', '_blank');
            }
        };
        LoginModule.prototype.removeEventListeners = function () {
            BC.removeEvent(this);
        };
        LoginModule.prototype.initOver = function () {
            EventManager.event(globalEvent.LOGIN_OPEN_SUC);
            // 先load必要资源
            this.updateView(ViewType.LOADING);
            // 读取本地账号和密码
            var accountId = window.localStorage.getItem("tmAccount");
            var passwd = window.localStorage.getItem("tmPasswd");
            var inUid = window.localStorage.getItem("uid");
            accountId && (this.inputZh.text = accountId);
            passwd && (this.inputPw.text = passwd);
            inUid && (this.inputInZh.text = inUid);
        };
        LoginModule.prototype.popupOver = function () {
            var _this = this;
            var notices = xls.get(xls.noticeBoard).getValues().filter(function (v) {
                var t1 = (new Date(v.noticeOpen)).getTime();
                var t2 = (new Date(v.noticeClose)).getTime();
                var now = (new Date()).getTime();
                return now >= t1 && now <= t2;
            });
            if (notices.length > 0) {
                this.showNotice();
            }
            else {
                this.showPrivacy();
            }
            /** 添加版本号*/
            this.txVersion.text = "app:" + clientCore.NativeMgr.instance.getAppVersion() + " ver:";
            res.load('update/assetsid.txt').then(function () {
                if (_this.txVersion)
                    _this.txVersion.text += res.get('update/assetsid.txt');
            });
            /** 现在直接开始*/
            this.updateView(ViewType.START);
        };
        LoginModule.prototype.showNotice = function () {
            if (clientCore.GlobalConfig.isIosTest)
                return;
            this._noticePanel = this._noticePanel || new login2.panel.NoticePanel();
            clientCore.DialogMgr.ins.open(this._noticePanel);
            this._noticePanel.once(Laya.Event.CLOSE, this, this.showPrivacy);
        };
        LoginModule.prototype.showPrivacy = function () {
            //只有官服展示隐私公示
            if (false)
                return;
            if (clientCore.GlobalConfig.isIosTest)
                return;
            var haveShow = Laya.LocalStorage.getItem('HAVE_SHOW_PRIVACAY') == 'true';
            if (!haveShow) {
                this._privacyPanel = this._privacyPanel || new login2.panel.PrivacyPanel();
                clientCore.DialogMgr.ins.open(this._privacyPanel);
            }
        };
        LoginModule.prototype.destroy = function () {
            var _a, _b;
            _super.prototype.destroy.call(this);
            (_a = this._privacyPanel) === null || _a === void 0 ? void 0 : _a.destroy();
            (_b = this._noticePanel) === null || _b === void 0 ? void 0 : _b.destroy();
            if (this._srvs) {
                this._srvs.length = 0;
                if (this._srvPanel)
                    clientCore.DialogMgr.ins.close(this._srvPanel, false);
                this._srvs = this._srvPanel = this._serialPanel = this._registerPanel = this._accountPanel = this._selectSrv = null;
            }
        };
        LoginModule.prototype.showLogin = function (e) {
            switch (channel.ChannelEnum.IOS) {
                case channel.ChannelEnum.INTERIOR:
                    this.updateView(ViewType.INSTERIOR);
                    break;
                case channel.ChannelEnum.TAOMEE:
                    this.updateView(ViewType.SIGNIN);
                    break;
                case channel.ChannelEnum.IOS:
                    this.updateView(ViewType.SIGNIN);
                    break;
                default:
                    channel.ChannelControl.ins.login();
                    break;
            }
        };
        LoginModule.prototype.updateView = function (type) {
            this.boxLoad.visible = type == ViewType.LOADING;
            this.boxStart.visible = type == ViewType.START;
            this.boxSign.visible = type == ViewType.SIGNIN;
            this.boxServer.visible = type == ViewType.SERVER_LIST;
            this.boxInsterior.visible = type == ViewType.INSTERIOR;
        };
        LoginModule.prototype.updateBar = function (tipStr, value) {
            var _this = this;
            if (clientCore.GlobalConfig.isIosTest)
                this.txTip.text = '正在进入游戏，请稍后。。。';
            else
                this.txTip.changeText(tipStr);
            Laya.Tween.to(this.imgPro, { width: value / 100 * 1083 }, 300, null, Laya.Handler.create(this, function () {
                EventManager.event(globalEvent.BEAN_LOAD_PRO_SUC);
                value >= 100 && _this.updateView(ViewType.START);
            }));
            Laya.Tween.to(this.imgFlower, { x: (this.imgPro.x + value / 100 * 1083) }, 300, null, null);
        };
        LoginModule.prototype.onRegister = function () {
            this._registerPanel = this._registerPanel || new login2.panel.RegPanel();
            this._registerPanel.show();
        };
        /** 内部登录*/
        LoginModule.prototype.onInLogin = function () {
            if (this.inputInZh.text == "") {
                alert.showFWords("账号不能为空~");
                return;
            }
            // 内部登录
            if (channel.ChannelConfig.channelId == channel.ChannelEnum.INTERIOR) {
                window.localStorage.setItem("uid", this.inputInZh.text);
                EventManager.event(globalEvent.SYN_ACCOUNT, [Number(this.inputInZh.text), Number(this.inputAge.text)]);
                this.destroy();
            }
        };
        LoginModule.prototype.onLogin = function () {
            if (this.inputZh.text == "") {
                alert.showFWords("账号不能为空~");
                return;
            }
            // 淘米登录
            if (channel.ChannelConfig.channelId == channel.ChannelEnum.TAOMEE || channel.ChannelConfig.channelId == channel.ChannelEnum.IOS) {
                //本地记录账号密码
                window.localStorage.setItem("tmAccount", this.inputZh.text);
                window.localStorage.setItem("tmPasswd", this.inputPw.text);
                EventManager.event(globalEvent.SYN_ACCOUNT, [this.inputZh.text, this.inputPw.text]);
            }
        };
        /** 展示激活码*/
        LoginModule.prototype.showSerial = function (suc) {
            this._serialPanel = this._serialPanel || new login2.panel.SerialPanel();
            this._serialPanel.show(suc);
        };
        /** 展示账号*/
        LoginModule.prototype.showAccount = function (accountId, passWd) {
            var _a;
            this._accountPanel = this._accountPanel || new login2.panel.AccountPanel();
            this._accountPanel.show(accountId, passWd);
            this.inputZh.text = accountId + "";
            this.inputPw.text = passWd;
            (_a = this._registerPanel) === null || _a === void 0 ? void 0 : _a.hide();
        };
        /** 连接getway*/
        LoginModule.prototype.onLinkGetway = function () {
            return __awaiter(this, void 0, void 0, function () {
                var uid, ran, srvAdress;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            uid = clientCore.GlobalConfig.uid;
                            clientCore.LocalInfo.uid = uid;
                            ran = _.random(0, channel.ChannelConfig.getways.length - 1, false);
                            srvAdress = channel.ChannelConfig.getways[ran];
                            if (!srvAdress) return [3 /*break*/, 4];
                            // 连接到getway
                            this.updateView(ViewType.NONE);
                            return [4 /*yield*/, net.connect(srvAdress, uid)];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, this.waitCheckSerial()];
                        case 2:
                            _a.sent();
                            return [4 /*yield*/, this.getSrvList()];
                        case 3:
                            _a.sent();
                            _a.label = 4;
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        /** 获取服务器列表*/
        LoginModule.prototype.getSrvList = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, net.sendAndWait(new pb.cs_gateway_get_online_list({ account: this.inputZh.text })).then(function (data) {
                                _this.updateView(ViewType.SERVER_LIST);
                                _this._srvs = data.onlines;
                                clientCore.Logger.sendLog('数据埋点', '游戏登陆统计', '获取服务器列表成功');
                                _this.updateCurSrv(_this.getFreeSrv(_this._srvs));
                            }).catch(function (e) {
                                if (!Laya.Render.isConchApp) {
                                    alert.showSmall("服务器正在维护中哦^_^");
                                    console.log('!!!!' + e);
                                }
                                else {
                                    _this.updateView(ViewType.START);
                                    BC.addEvent(_this, _this.boxStart, Laya.Event.CLICK, _this, _this.showTSrvErr);
                                    _this._noticePanel ? (_this._noticePanel.closeHandler = Laya.Handler.create(_this, _this.showTSrvErr)) : _this.showTSrvErr();
                                }
                            })];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        /** 在app中显示服务器错误*/
        LoginModule.prototype.showTSrvErr = function () {
            if (!Laya.Render.isConchApp || this._srvs != void 0)
                return;
            alert.showSmall(xls.get(xls.serverMaintenance).get(1).descInfo, {
                btnType: alert.Btn_Type.ONLY_SURE,
                needClose: false,
                clickMaskClose: false
            });
        };
        /** 更新当前服务器*/
        LoginModule.prototype.updateCurSrv = function (msg) {
            var _a;
            this._selectSrv = msg;
            this.txStatus.visible = msg.status == 4;
            var _xlsData = xls.get(xls.serverName);
            var name = _xlsData.has(msg.id % 10000) ? _xlsData.get(msg.id % 10000).serverName : (_a = _xlsData.get(msg.id % 600)) === null || _a === void 0 ? void 0 : _a.serverName;
            this.txSrvName.text = name ? name : ' ';
        };
        LoginModule.prototype.getFreeSrv = function (arr) {
            var array = [];
            var arr_1 = [];
            var arr_4 = [];
            _.forEach(arr, function (element) {
                if (element.status == 2 || element.status == 3) {
                    array.push(element);
                }
                if (element.status == 1) {
                    arr_1.push(element);
                }
                if (element.status == 4) {
                    arr_4.push(element);
                }
            });
            var len = array.length;
            if (len > 0) {
                var ran = _.random(0, len - 1, false);
                return array[ran];
            }
            len = arr_1.length;
            if (len > 0) {
                var ran = _.random(0, len - 1, false);
                return arr_1[ran];
            }
            len = arr_4.length;
            if (len > 0) {
                var ran = _.random(0, len - 1, false);
                return arr_4[ran];
            }
            return this.getSuitableSrv(arr);
        };
        /** 寻找合适的服务器*/
        LoginModule.prototype.getSuitableSrv = function (arr) {
            arr.sort(function (s1, s2) {
                if (s1.status == 2) {
                    return -1;
                }
                else if (s1.status < s2.status) {
                    return -1;
                }
                return 1;
            });
            // let ran = _.random(0, arr.length - 1, false);
            return arr[0]; //优先推荐
        };
        /** 打开服务器列表*/
        LoginModule.prototype.onShowSrv = function () {
            this._srvPanel = this._srvPanel || new login2.panel.ServerPanel();
            this._srvPanel.show(this._srvs);
        };
        /** 游戏登录*/
        LoginModule.prototype.onGameLogin = function (e) {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!this._selectSrv) {
                                alert.showFWords("服务器维护中~");
                                return [2 /*return*/];
                            }
                            if (this._selectSrv.status == 4) {
                                alert.showFWords("服务器已经爆满啦QaQ");
                                return [2 /*return*/];
                            }
                            if (this._nowLogining) {
                                return [2 /*return*/];
                            }
                            if (e.target instanceof Laya.Image) {
                                return [2 /*return*/];
                            }
                            clientCore.Logger.sendLog('数据埋点', '游戏登陆统计', '点击登陆');
                            /** 终端 1-web 2-android 3-ios*/
                            this._nowLogining = true;
                            /** 查询实名认证-第一次没有查询到*/
                            return [4 /*yield*/, channel.ChannelControl.ins.queryAntiAddiction("第二次实名认证查询...")];
                        case 1:
                            /** 查询实名认证-第一次没有查询到*/
                            _a.sent();
                            net.sendAndWait(new pb.cs_gateway_enter_server({
                                onlineId: this._selectSrv.id,
                                account: core.SignMgr.useSign ? core.SignMgr.uid + "" : channel.ChannelConfig.channelUserID.toString(),
                                channel: channel.ChannelConfig.channelId,
                                subChannel: channel.ChannelConfig.subChannelId,
                                token: core.SignMgr.useSign ? core.SignMgr.token : clientCore.GlobalConfig.token,
                                phoneOS: Laya.Browser.onAndroid ? 2 : (Laya.Browser.onIOS ? 3 : 1),
                                macAddress: clientCore.NativeMgr.instance.getIMEI()
                            })).then(function (data) {
                                clientCore.GlobalConfig.serverId = _this._selectSrv.id;
                                clientCore.GlobalConfig.serverName = _this._selectSrv.name;
                                clientCore.GlobalConfig.serverShowName = _this.txSrvName.text;
                                window.localStorage.setItem('history_server_id', _this._selectSrv.id + '');
                                /** 选择好服务器登录*/
                                channel.ChannelControl.ins.reportRoleData(1);
                                var real = clientCore.RealManager.ins;
                                real.onlineTime = data.todayOnline;
                                real.rechargeCnt = data.payCount;
                                real.startServerTime = clientCore.ServerManager.curServerTime = data.curTimestamp;
                                real.checkPlayGame() && _this.loginSuc(data);
                                _this._nowLogining = false;
                            }).catch(function (e) {
                                _this.loginFail('login失败');
                                _this._nowLogining = false;
                            });
                            return [2 /*return*/];
                    }
                });
            });
        };
        /** 登录成功*/
        LoginModule.prototype.loginSuc = function (data) {
            clientCore.Logger.sendLog('数据埋点', '游戏登陆统计', '登陆成功');
            this.destroy();
            clientCore.LocalInfo.setUserCreate(data);
            EventManager.event(globalEvent.ENTER_GEME_SUC);
            EventManager.event("LOGIN_SUCCESS");
        };
        LoginModule.prototype.loginFail = function (tips) {
            alert.showFWords(tips);
        };
        /** 等待检查激活码*/
        LoginModule.prototype.waitCheckSerial = function () {
            var _this = this;
            return new Promise(function (suc) {
                net.sendAndWait(new pb.cs_get_user_code_status({ account: _this.inputZh.text })).then(function (msg) {
                    msg.result == 0 ? _this.showSerial(suc) : suc();
                });
            });
        };
        return LoginModule;
    }(ui.login2.LoginModuleUI));
    login2.LoginModule = LoginModule;
})(login2 || (login2 = {}));
var login2;
(function (login2) {
    var panel;
    (function (panel) {
        /**
         * 账号展示
         */
        var AccountPanel = /** @class */ (function (_super) {
            __extends(AccountPanel, _super);
            function AccountPanel() {
                var _this = _super.call(this) || this;
                _this.sideClose = false;
                return _this;
            }
            AccountPanel.prototype.show = function (accountId, passWd) {
                clientCore.DialogMgr.ins.open(this);
                this.txAccount.changeText(accountId + "");
                this.txPasswd.changeText(passWd);
            };
            AccountPanel.prototype.addEventListeners = function () {
                BC.addEvent(this, this.btnLogin, Laya.Event.CLICK, this, this.hide);
            };
            AccountPanel.prototype.removeEventListeners = function () {
                BC.removeEvent(this);
            };
            AccountPanel.prototype.hide = function () {
                clientCore.DialogMgr.ins.close(this);
            };
            return AccountPanel;
        }(ui.login2.panel.AccountUI));
        panel.AccountPanel = AccountPanel;
    })(panel = login2.panel || (login2.panel = {}));
})(login2 || (login2 = {}));
var login2;
(function (login2) {
    var panel;
    (function (panel) {
        var NoticePanel = /** @class */ (function (_super) {
            __extends(NoticePanel, _super);
            function NoticePanel() {
                var _this = _super.call(this) || this;
                _this.sideClose = false;
                _this.list.vScrollBarSkin = null;
                _this.list.selectEnable = true;
                _this.list.renderHandler = new Laya.Handler(_this, _this.onListRender);
                _this.list.selectHandler = new Laya.Handler(_this, _this.onListSelectHanlder);
                var arr = xls.get(xls.noticeBoard).getValues();
                _this.list.dataSource = arr.filter(function (v) {
                    var t1 = (new Date(v.noticeOpen)).getTime();
                    var t2 = (new Date(v.noticeClose)).getTime();
                    var now = (new Date()).getTime();
                    var needType = channel.ChannelControl.ins.isOfficial ? 1 : 2;
                    return now >= t1 && now <= t2 && (needType == v.isOffical || v.isOffical == 0);
                });
                _this.txtTitle.text = '';
                _this.txtDesc.text = '';
                _this.list.selectedIndex = _this.list.dataSource.length > 0 ? 0 : -1;
                _this.panel.vScrollBarSkin = null;
                return _this;
            }
            // private getTime(str: string) {
            //     let arr = _.map(str.split('-'), (s) => {
            //         return parseInt(s);
            //     });
            //     let t = new Date(arr[0], arr[1] - 1, arr[2]);
            //     return t.getTime();
            // }
            NoticePanel.prototype.onListRender = function (box, idx) {
                var data = box.dataSource;
                box.getChildByName('clipBg').index = this.list.selectedIndex == idx ? 0 : 1;
                box.getChildByName('clipHead').index = data.noticeType == 1 ? 0 : 1;
                box.getChildByName('txt').text = data.noticeTitle;
            };
            NoticePanel.prototype.onListSelectHanlder = function (idx) {
                var data = this.list.selectedItem;
                this.txtTitle.text = data.noticeTitle;
                this.txtDesc.text = data.noticeDes;
                this.img.skin = pathConfig.getNoticeImg(data.img);
                this.panel.height = data.img ? 249 : 355;
            };
            NoticePanel.prototype.onClose = function () {
                clientCore.DialogMgr.ins.close(this);
                this.closeHandler && this.closeHandler.run();
                this.closeHandler = null;
            };
            NoticePanel.prototype.addEventListeners = function () {
                BC.addEvent(this, this.btnSure, Laya.Event.CLICK, this, this.onClose);
            };
            NoticePanel.prototype.removeEventListeners = function () {
                BC.removeEvent(this);
            };
            return NoticePanel;
        }(ui.login2.panel.NoticePanelUI));
        panel.NoticePanel = NoticePanel;
    })(panel = login2.panel || (login2.panel = {}));
})(login2 || (login2 = {}));
var login2;
(function (login2) {
    var panel;
    (function (panel) {
        var PrivacyPanel = /** @class */ (function (_super) {
            __extends(PrivacyPanel, _super);
            function PrivacyPanel() {
                var _this = _super.call(this) || this;
                var txt = res.get('res/json/privacy.txt');
                _this.txt.text = txt;
                _this.panel.vScrollBarSkin = null;
                _this.imgGou.visible = false;
                _this.updateView();
                return _this;
            }
            PrivacyPanel.prototype.change = function () {
                var scrollBar = this.panel.vScrollBar;
                this.imgBar.y = (this.imgBagBg.height - this.imgBar.height) * (scrollBar.value / scrollBar.max) + this.imgBagBg.y;
            };
            PrivacyPanel.prototype.updateView = function () {
                this.btnSure.disabled = !this.imgGou.visible;
            };
            PrivacyPanel.prototype.onSelect = function () {
                this.imgGou.visible = !this.imgGou.visible;
                this.updateView();
            };
            PrivacyPanel.prototype.addEventListeners = function () {
                BC.addEvent(this, this.boxSelect, Laya.Event.CLICK, this, this.onSelect);
                BC.addEvent(this, this.btnSure, Laya.Event.CLICK, this, this.onClosePanel);
                BC.addEvent(this, this.panel.vScrollBar, Laya.Event.CHANGE, this, this.change);
            };
            PrivacyPanel.prototype.removeEventListeners = function () {
                BC.removeEvent(this);
            };
            PrivacyPanel.prototype.onClosePanel = function () {
                Laya.LocalStorage.setItem('HAVE_SHOW_PRIVACAY', 'true');
                clientCore.DialogMgr.ins.close(this);
            };
            return PrivacyPanel;
        }(ui.login2.panel.PrivacyPanelUI));
        panel.PrivacyPanel = PrivacyPanel;
    })(panel = login2.panel || (login2.panel = {}));
})(login2 || (login2 = {}));
var login2;
(function (login2) {
    var panel;
    (function (panel) {
        var TAB;
        (function (TAB) {
            TAB[TAB["PHONE"] = 0] = "PHONE";
            TAB[TAB["NORMAL"] = 1] = "NORMAL";
        })(TAB || (TAB = {}));
        /**
         * 注册
         */
        var RegPanel = /** @class */ (function (_super) {
            __extends(RegPanel, _super);
            function RegPanel() {
                var _this = _super.call(this) || this;
                _this._tab = TAB.PHONE;
                _this._phoneReg = new login2.PhoneRegControl(_this.reg_phone);
                _this._normalReg = new login2.NormalRegControl(_this.reg_normal);
                return _this;
            }
            RegPanel.prototype.show = function () {
                clientCore.DialogMgr.ins.open(this);
                this.showTab();
                this.changeAgreement();
            };
            RegPanel.prototype.addEventListeners = function () {
                BC.addEvent(this, this.btnClose, Laya.Event.CLICK, this, this.hide);
                BC.addEvent(this, this.btnReg, Laya.Event.CLICK, this, this.onApply);
                BC.addEvent(this, this.imgBox, Laya.Event.CLICK, this, this.changeAgreement);
                BC.addEvent(this, this.txtClause, Laya.Event.CLICK, this, this.onAgreement);
                BC.addEvent(this, this.tab_account, Laya.Event.CLICK, this, this.onTabChange, [TAB.NORMAL]);
                BC.addEvent(this, this.tab_phone, Laya.Event.CLICK, this, this.onTabChange, [TAB.PHONE]);
            };
            RegPanel.prototype.removeEventListeners = function () {
                BC.removeEvent(this);
            };
            RegPanel.prototype.hide = function () {
                clientCore.DialogMgr.ins.close(this);
            };
            RegPanel.prototype.changeAgreement = function () {
                this.imgGou.visible = !this.imgGou.visible;
                this.btnReg.disabled = !this.imgGou.visible;
            };
            RegPanel.prototype.onAgreement = function () {
                if (Laya.Render.isConchApp) {
                    clientCore.NativeMgr.instance.openUrl('http://www.61.com/about/service.html');
                }
                else {
                    window.open('http://www.61.com/about/service.html', '_blank');
                }
            };
            RegPanel.prototype.onTabChange = function (tab) {
                if (this._tab != tab) {
                    this._tab = tab;
                    this.showTab();
                }
            };
            RegPanel.prototype.showTab = function () {
                this.reg_phone.visible = this._tab == TAB.PHONE;
                this.reg_normal.visible = this._tab == TAB.NORMAL;
                this.tab_phone.getChildAt(0).index = this._tab == TAB.PHONE ? 1 : 0;
                this.tab_account.getChildAt(0).index = this._tab == TAB.NORMAL ? 1 : 0;
                this.tab_phone.getChildAt(1).y = this._tab == TAB.PHONE ? 23 : 33;
                this.tab_account.getChildAt(1).y = this._tab == TAB.NORMAL ? 23 : 33;
            };
            RegPanel.prototype.onApply = function () {
                var _a, _b;
                switch (this._tab) {
                    case TAB.PHONE:
                        (_a = this._phoneReg) === null || _a === void 0 ? void 0 : _a.startReg();
                        break;
                    case TAB.NORMAL:
                        (_b = this._normalReg) === null || _b === void 0 ? void 0 : _b.startReg();
                        break;
                    default:
                        break;
                }
            };
            return RegPanel;
        }(ui.login2.panel.RegPanelUI));
        panel.RegPanel = RegPanel;
    })(panel = login2.panel || (login2.panel = {}));
})(login2 || (login2 = {}));
var login2;
(function (login2) {
    var panel;
    (function (panel) {
        /**
         * 验证码
         */
        var SerialPanel = /** @class */ (function (_super) {
            __extends(SerialPanel, _super);
            function SerialPanel() {
                var _this = _super.call(this) || this;
                _this.sideClose = false;
                return _this;
            }
            SerialPanel.prototype.show = function (suc) {
                clientCore.DialogMgr.ins.open(this);
                this._suc = suc;
            };
            SerialPanel.prototype.addEventListeners = function () {
                BC.addEvent(this, this.btnClose, Laya.Event.CLICK, this, this.hide);
                BC.addEvent(this, this.btnSure, Laya.Event.CLICK, this, this.onSure);
            };
            SerialPanel.prototype.removeEventListeners = function () {
                BC.removeEvent(this);
            };
            SerialPanel.prototype.hide = function () {
                clientCore.DialogMgr.ins.close(this);
            };
            SerialPanel.prototype.destroy = function () {
                _super.prototype.destroy.call(this);
                this._suc = null;
            };
            /** 检测验证码*/
            SerialPanel.prototype.onSure = function () {
                var _this = this;
                net.sendAndWait(new pb.cs_user_use_invitation_code({ code: this.input.text })).then(function (msg) {
                    _this._suc();
                    _this.hide();
                });
            };
            return SerialPanel;
        }(ui.login2.panel.SerialUI));
        panel.SerialPanel = SerialPanel;
    })(panel = login2.panel || (login2.panel = {}));
})(login2 || (login2 = {}));
var login2;
(function (login2) {
    var panel;
    (function (panel) {
        /**
         * 服务器列表
         */
        var ServerPanel = /** @class */ (function (_super) {
            __extends(ServerPanel, _super);
            function ServerPanel() {
                var _this = _super.call(this) || this;
                _this.reList.renderHandler = Laya.Handler.create(_this, _this.recommandRender, null, false);
                _this.reList.selectHandler = Laya.Handler.create(_this, _this.recommandSelect, null, false);
                _this.serverList.vScrollBarSkin = "";
                _this.serverList.renderHandler = Laya.Handler.create(_this, _this.serverRender, null, false);
                _this.serverList.selectHandler = Laya.Handler.create(_this, _this.serverSelect, null, false);
                _this.serverList.scrollBar.elasticBackTime = 200;
                _this.serverList.scrollBar.elasticDistance = 200;
                return _this;
            }
            ServerPanel.prototype.show = function (array) {
                clientCore.DialogMgr.ins.open(this);
                this._xlsData = xls.get(xls.serverName);
                this.updateView(array);
            };
            ServerPanel.prototype.onInputOver = function () {
                var targetId = this.txtInput.text;
                var idx = _.findIndex(this._allSrv, function (o) { return o.id == parseInt(targetId); });
                if (idx > -1) {
                    this.serverList.dataSource = [this._allSrv[idx]];
                    this.selectRender(this._allSrv[idx]);
                }
                else {
                    this.serverList.array = this._allSrv;
                    var ran = _.random(0, this._allSrv.length - 1, false);
                    this.selectRender(this._allSrv[ran]);
                }
            };
            ServerPanel.prototype.addEventListeners = function () {
                BC.addEvent(this, this.btnClose, Laya.Event.CLICK, this, this.hide);
                BC.addEvent(this, this.btnSure, Laya.Event.CLICK, this, this.onSure);
                BC.addEvent(this, this.txtInput, Laya.Event.INPUT, this, this.onInputOver);
            };
            ServerPanel.prototype.removeEventListeners = function () {
                BC.removeEvent(this);
            };
            ServerPanel.prototype.destroy = function () {
                this._curSrv = this._xlsData = null;
                _super.prototype.destroy.call(this);
            };
            ServerPanel.prototype.hide = function () {
                clientCore.DialogMgr.ins.close(this);
            };
            ServerPanel.prototype.onSure = function () {
                EventManager.event(globalEvent.SELECT_ONE_SERVER, this._curSrv);
                this.hide();
            };
            // status 1-4 空闲 推荐 火热 爆满
            ServerPanel.prototype.updateView = function (array) {
                var _this = this;
                var reArr = [[], [], [], []]; //推荐
                _.forEach(array, function (element) {
                    reArr[element.status - 1].push(element);
                });
                for (var i = 0; i < reArr.length; i++) {
                    reArr[i] = _.shuffle(reArr[i]);
                }
                this._allSrv = _.flatten(reArr);
                this._lastId = parseInt(window.localStorage.getItem('history_server_id'));
                this.serverList.array = this._allSrv;
                this.reList.array = _.concat(_.filter(this._allSrv, function (element) { return element.id == _this._lastId; }), _.filter(this._allSrv, function (element) { return element.id != _this._lastId; }));
                this.serverList.selectedIndex = _.random(0, array.length - 1, false);
            };
            /** 当前选择渲染*/
            ServerPanel.prototype.selectRender = function (info) {
                this.curServer.imgBG.skin = "selectServer/rect2.png";
                this.itemRender(this.curServer, info, true);
                this._curSrv = info;
            };
            /** 推荐服务器渲染 */
            ServerPanel.prototype.recommandRender = function (item, index) {
                var info = item.dataSource;
                item.imgBG.skin = "selectServer/rect3.png";
                this.itemRender(item, info);
            };
            ServerPanel.prototype.recommandSelect = function (index) {
                if (index == -1)
                    return;
                this.selectRender(this.reList.array[index]);
                this.serverList.selectedIndex = -1;
            };
            /** 全部服务器渲染*/
            ServerPanel.prototype.serverRender = function (item, index) {
                var info = item.dataSource;
                item.imgBG.skin = index == this.serverList.selectedIndex ? "selectServer/rect4.png" : "selectServer/rect1.png";
                this.itemRender(item, info);
            };
            ServerPanel.prototype.serverSelect = function (index) {
                if (index == -1)
                    return;
                this.selectRender(this.serverList.array[index]);
                this.reList.selectedIndex = -1;
            };
            ServerPanel.prototype.itemRender = function (item, info, isCur) {
                var _a;
                if (!item || !info)
                    return;
                if (!this._xlsData)
                    return;
                item.txID.changeText(info.id + "");
                var name = this._xlsData.has(info.id % 10000) ? this._xlsData.get(info.id % 10000).serverName : (_a = this._xlsData.get(info.id % 600)) === null || _a === void 0 ? void 0 : _a.serverName;
                item.txName.text = name ? name : ' ';
                var isBoom = info.status == 4;
                item.imgBm.visible = isBoom;
                item.imgCir.skin = isBoom ? "selectServer/yuan_new.png" : "selectServer/yuan_new_!.png";
                item.imgHistory.visible = !isCur && this._lastId == info.id;
            };
            return ServerPanel;
        }(ui.login2.panel.ServerPanelUI));
        panel.ServerPanel = ServerPanel;
    })(panel = login2.panel || (login2.panel = {}));
})(login2 || (login2 = {}));
var login2;
(function (login2) {
    //文档地址 http://10.1.1.104/showdoc/index.php?s=/2&page_id=13
    var REG_NORMAL_URL = 'http://account-co.61.com/gameRegister/registerCustom';
    var NormalRegControl = /** @class */ (function () {
        function NormalRegControl(v) {
            this.ui = v;
            this.ui.visible = false;
            this._labelArr = [this.ui.txtAccount, this.ui.txtPw_0, this.ui.txtPw_1, this.ui.txtVerify];
            BC.addEvent(this, this.ui.btnGet, Laya.Event.CLICK, this, this.onReqVerifyCode);
            this.onReqVerifyCode();
        }
        NormalRegControl.prototype.startReg = function () {
            var _this = this;
            if (this.validateInput()) {
                if (this.ui.txtVerify.text.length > 0) {
                    var http = new Laya.HttpRequest();
                    http.once(Laya.Event.COMPLETE, this, function (data) {
                        if (data && data.result == 0)
                            EventManager.event(globalEvent.SIGIIN_SUCCESS, [_this.ui.txtAccount.text, _this.ui.txtPw_0.text]);
                        if (data && data.err_desc) {
                            _this.onReqVerifyCode();
                            alert.showFWords(data.err_desc);
                        }
                    });
                    http.http.withCredentials = true; //跨域传入Cookie
                    var paramArr = [
                        "account=" + this.ui.txtAccount.text,
                        "passwd=" + this.ui.txtPw_0.text,
                        "sec_passwd=" + this.ui.txtPw_1.text,
                        "ret_type=" + 2,
                        "game=" + 695,
                        "tad=" + 'unknown',
                        "vericode=" + this.ui.txtVerify.text,
                        "real_name=" + '北京人',
                        "identification=" + '110101199003076739'
                    ];
                    http.send(REG_NORMAL_URL, paramArr.join('&'), "post", "json");
                }
            }
        };
        /**
        * 请求图片验证码
        */
        NormalRegControl.prototype.onReqVerifyCode = function () {
            var _this = this;
            this.vericodeUrl && Laya.loader.clearRes(this.vericodeUrl); //清理缓存
            if (!Laya.Render.isConchApp) {
                this.vericodeUrl = "http://account-co.61.com/vericode/generate?game=695&s=" + Math.floor(Math.random() * 1000000);
                var http = new Laya.HttpRequest();
                http.once(Laya.Event.COMPLETE, this, function (data) {
                    _this.ui.imgVerify.skin = "data:image/png;base64," + _this.arrayBufferToBase64(data);
                });
                http.http.withCredentials = true; //跨域传入Cookie
                http.send(this.vericodeUrl, "", "get", "arraybuffer");
            }
            else {
                this.ui.imgVerify.skin = "http://account-co.61.com/vericode/generate?game=695&s=" + Math.floor(Math.random() * 1000000);
            }
        };
        NormalRegControl.prototype.arrayBufferToBase64 = function (buffer) {
            var binary = '';
            var bytes = new Uint8Array(buffer);
            var len = bytes.byteLength;
            for (var i = 0; i < len; i += 1) {
                binary += String.fromCharCode(bytes[i]);
            }
            return Laya.Browser.window.btoa(binary); //base64
        };
        ;
        NormalRegControl.prototype.validateInput = function () {
            var regAccount = /^[a-zA-Z0-9_-]{6,20}$/;
            var regPw = /^[a-zA-Z0-9]{6,16}$/;
            if (regAccount.test(this.ui.txtAccount.text))
                if (regPw.test(this.ui.txtPw_0.text))
                    if (this.ui.txtPw_0.text == this.ui.txtPw_1.text)
                        return true;
                    else
                        alert.showFWords('两次输入密码不相同');
                else
                    alert.showFWords('密码不符合要求');
            else
                alert.showFWords('账号格式不正确');
            return false;
        };
        NormalRegControl.prototype.destory = function () {
            BC.removeEvent(this);
        };
        return NormalRegControl;
    }());
    login2.NormalRegControl = NormalRegControl;
})(login2 || (login2 = {}));
var login2;
(function (login2) {
    //文档地址 http://10.1.1.104/showdoc/index.php?s=/2&page_id=23
    var REG_PHONE_URL = 'http://account-co.61.com/gameRegister/registerPhone';
    var VERIFY_PHONE_URL = 'http://account-co.61.com/gameRegister/verifyPhone';
    var PhoneRegControl = /** @class */ (function () {
        function PhoneRegControl(v) {
            this.ui = v;
            this.ui.visible = false;
            this._labelArr = [this.ui.txtPhone, this.ui.txtPw_0, this.ui.txtPw_1, this.ui.txtVerify];
            BC.addEvent(this, this.ui.btnGet, Laya.Event.CLICK, this, this.onReqVerifyCode);
        }
        PhoneRegControl.prototype.startReg = function () {
            var _this = this;
            if (this.validateInput()) {
                if (this.ui.txtVerify.text.length > 0) {
                    var http = new Laya.HttpRequest();
                    http.once(Laya.Event.COMPLETE, this, function (data) {
                        if (data && data.result == 0)
                            EventManager.event(globalEvent.SIGIIN_SUCCESS, [_this.ui.txtPhone.text, _this.ui.txtPw_0.text]);
                        if (data && data.err_desc)
                            alert.showFWords(data.err_desc);
                    });
                    http.http.withCredentials = true; //跨域传入Cookie
                    var paramArr = [
                        "phone_code=" + this.ui.txtVerify.text,
                        'ret_type=2'
                    ];
                    http.send(VERIFY_PHONE_URL, paramArr.join('&'), "post", "json");
                }
            }
        };
        /**
        * 请求短信验证码
        */
        PhoneRegControl.prototype.onReqVerifyCode = function () {
            if (this.validateInput()) {
                var http = new Laya.HttpRequest();
                http.once(Laya.Event.COMPLETE, this, function (data) {
                    if (data && data.result == 0)
                        alert.showFWords('验证码已发送');
                    if (data && data.err_desc)
                        alert.showFWords(data.err_desc);
                });
                http.http.withCredentials = true; //跨域传入Cookie
                var paramArr = [
                    "account=" + this.ui.txtPhone.text,
                    "passwd=" + this.ui.txtPw_0.text,
                    "sec_passwd=" + this.ui.txtPw_1.text,
                    "ret_type=" + 2,
                    "game=" + 695,
                    "tad=" + 'unknown',
                ];
                http.send(REG_PHONE_URL, paramArr.join('&'), "post", "json");
            }
        };
        PhoneRegControl.prototype.validateInput = function () {
            var regPhone = /^1[3456789]\d{9}$/;
            var regPw = /^[a-zA-Z0-9]{6,16}$/;
            if (regPhone.test(this.ui.txtPhone.text))
                if (regPw.test(this.ui.txtPw_0.text))
                    if (this.ui.txtPw_0.text == this.ui.txtPw_1.text)
                        return true;
                    else
                        alert.showFWords('两次输入密码不相同');
                else
                    alert.showFWords('密码不符合要求');
            else
                alert.showFWords('手机号输入不正确');
            return false;
        };
        PhoneRegControl.prototype.destory = function () {
            BC.removeEvent(this);
        };
        return PhoneRegControl;
    }());
    login2.PhoneRegControl = PhoneRegControl;
})(login2 || (login2 = {}));

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9sb2dpbjIvTG9naW5Nb2R1bGUudHMiLCJzcmMvbG9naW4yL3BhbmVsL0FjY291bnRQYW5lbC50cyIsInNyYy9sb2dpbjIvcGFuZWwvTm90aWNlUGFuZWwudHMiLCJzcmMvbG9naW4yL3BhbmVsL1ByaXZhY3lQYW5lbC50cyIsInNyYy9sb2dpbjIvcGFuZWwvUmVnUGFuZWwudHMiLCJzcmMvbG9naW4yL3BhbmVsL1NlcmlhbFBhbmVsLnRzIiwic3JjL2xvZ2luMi9wYW5lbC9TZXJ2ZXJQYW5lbC50cyIsInNyYy9sb2dpbjIvcmVnQ29udHJvbC9Ob3JtYWxSZWdDb250cm9sLnRzIiwic3JjL2xvZ2luMi9yZWdDb250cm9sL1Bob25lUmVnQ29udHJvbC50cyIsInNyYy9sb2dpbjIvcmVnQ29udHJvbC9JUmVnQ29udHJvbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBVSxNQUFNLENBb1pmO0FBcFpELFdBQVUsTUFBTTtJQUVaLElBQUssUUFPSjtJQVBELFdBQUssUUFBUTtRQUNULHVDQUFJLENBQUE7UUFDSixpREFBUyxDQUFBO1FBQ1QsNkNBQU8sQ0FBQTtRQUNQLHlDQUFLLENBQUE7UUFDTCwyQ0FBTSxDQUFBO1FBQ04scURBQVcsQ0FBQTtJQUNmLENBQUMsRUFQSSxRQUFRLEtBQVIsUUFBUSxRQU9aO0lBQ0Q7O09BRUc7SUFDSDtRQUFpQywrQkFBdUI7UUFZcEQ7bUJBQ0ksaUJBQU87UUFDWCxDQUFDO1FBRU0sMEJBQUksR0FBWDtZQUNJLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztZQUMxQyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLGlCQUFpQixFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDdkQsSUFBSSxD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Qzs7d0JBRVosS0FBSyxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsQ0FBQzs7b0JBRWxDLEtBQUssQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUM7O2dCQUVoQyxLQUFLLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBRWpDLE9BQU8sS0FBSyxDQUFDO1FBQ2pCLENBQUM7UUFFRCxpQ0FBTyxHQUFQO1lBQ0ksRUFBRSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN6QixDQUFDO1FBQ0wsc0JBQUM7SUFBRCxDQTdFQSxBQTZFQyxJQUFBO0lBN0VZLHNCQUFlLGtCQTZFM0IsQ0FBQTtBQUNMLENBQUMsRUFuRlMsTUFBTSxLQUFOLE1BQU0sUUFtRmYiLCJmaWxlIjoibG9naW4yLmpzIiwic291cmNlc0NvbnRlbnQiOlsibmFtZXNwYWNlIGxvZ2luMiB7XHJcblxyXG4gICAgZW51bSBWaWV3VHlwZSB7XHJcbiAgICAgICAgTk9ORSwgLy/pg73kuI3mmL7npLpcclxuICAgICAgICBJTlNURVJJT1IsIC8v5YaF6YOo55m75b2VXHJcbiAgICAgICAgTE9BRElORywgLy/ov5vluqZcclxuICAgICAgICBTVEFSVCxcclxuICAgICAgICBTSUdOSU4sXHJcbiAgICAgICAgU0VSVkVSX0xJU1RcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog55m75b2VMi4wXHJcbiAgICAgKi9cclxuICAgIGV4cG9ydCBjbGFzcyBMb2dpbk1vZHVsZSBleHRlbmRzIHVpLmxvZ2luMi5Mb2dpbk1vZHVsZVVJIHtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBfcmVnaXN0ZXJQYW5lbDogcGFuZWwuUmVnUGFuZWw7IC8v5rOo5YaM6Z2i5p2/XHJcbiAgICAgICAgcHJpdmF0ZSBfc2VyaWFsUGFuZWw6IHBhbmVsLlNlcmlhbFBhbmVsOyAvL+a/gOa0u+eggVxyXG4gICAgICAgIHByaXZhdGUgX2FjY291bnRQYW5lbDogcGFuZWwuQWNjb3VudFBhbmVsOyAvL+ehruiupOi0puWPt+mdouadv1xyXG4gICAgICAgIHByaXZhdGUgX3NydlBhbmVsOiBwYW5lbC5TZXJ2ZXJQYW5lbDsgLy/mnI3liqHlmajliJfooajpnaLmnb9cclxuICAgICAgICBwcml2YXRlIF9ub3RpY2VQYW5lbDogcGFuZWwuTm90aWNlUGFuZWw7Ly/lhazlkYrpnaLmnb9cclxuICAgICAgICBwcml2YXRlIF9wcml2YWN5UGFuZWw6IHBhbmVsLlByaXZhY3lQYW5lbDsvL+makOengemdouadv1xyXG5cclxuICAgICAgICBwcml2YXRlIF9zZWxlY3RTcnY6IHBiLklvbmxpbmVJbmZvOyAvL+W9k+WJjemAieaLqeeahOacjeWKoeWZqFxyXG4gICAgICAgIHByaXZhdGUgX3NydnM6IHBiLklvbmxpbmVJbmZvW107IC8v5pyN5Yqh5Zmo5YiX6KGoXHJcblxyXG4gICAgICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGluaXQoKTogdm9pZCB7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkUHJlTG9hZCh4bHMubG9hZCh4bHMuc2VydmVyTmFtZSkpO1xyXG4gICAgICAgICAgICB0aGlzLmFkZFByZUxvYWQoeGxzLmxvYWQoeGxzLnNlcnZlck1haW50ZW5hbmNlLCB0cnVlKSk7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkUHJlTG9hZChyZXMubG9hZChcImF0bGFzL3NlbGVjdFNlcnZlci5hdGxhc1wiKSk7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkUHJlTG9hZChyZXMubG9hZCgnYXRsYXMvbG9naW4yL3BhbmVsL25vdGljZS5hdGxhcycpKTtcclxuICAgICAgICAgICAgdGhpcy5hZGRQcmVMb2FkKHJlcy5sb2FkKCdyZXMvanNvbi9wcml2YWN5LnR4dCcpKTtcclxuICAgICAgICAgICAgdGhpcy5hZGRQcmVMb2FkKHhscy5sb2FkKHhscy5ub3RpY2VCb2FyZCwgdHJ1ZSkpO1xyXG4gICAgICAgICAgICBjb3JlLlNvdW5kTWFuYWdlci5pbnN0YW5jZS5wbGF5QmdtKHBhdGhDb25maWcuZ2V0QmdtVXJsKCdsb2dpbicpLCB0cnVlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBhZGRFdmVudExpc3RlbmVycygpOiB2b2lkIHtcclxuICAgICAgICAgICAgQkMuYWRkRXZlbnQodGhpcywgRXZlbnRNYW5hZ2VyLCBnbG9iYWxFdmVudC5CRUFOX0xPQURfUFJPLCB0aGlzLCB0aGlzLnVwZGF0ZUJhcik7XHJcbiAgICAgICAgICAgIEJDLmFkZEV2ZW50KHRoaXMsIHRoaXMuYnRuQ2hhbmdlLCBMYXlhLkV2ZW50LkNMSUNLLCB0aGlzLCB0aGlzLnNob3dMb2dpbik7XHJcbiAgICAgICAgICAgIEJDLmFkZEV2ZW50KHRoaXMsIHRoaXMuYm94U3RhcnQsIExheWEuRXZlbnQuQ0xJQ0ssIHRoaXMsIHRoaXMuc2hvd0xvZ2luKTtcclxuICAgICAgICAgICAgQkMuYWRkRXZlbnQodGhpcywgdGhpcy5ib3hTZXJ2ZXIsIExheWEuRXZlbnQuQ0xJQ0ssIHRoaXMsIHRoaXMub25HYW1lTG9naW4pO1xyXG4gICAgICAgICAgICBCQy5hZGRFdmVudCh0aGlzLCB0aGlzLmJ0blJlZ2lzdGVyLCBMYXlhLkV2ZW50LkNMSUNLLCB0aGlzLCB0aGlzLm9uUmVnaXN0ZXIpO1xyXG4gICAgICAgICAgICBCQy5hZGRFdmVudCh0aGlzLCB0aGlzLmJ0bkxvZ2luLCBMYXlhLkV2ZW50LkNMSUNLLCB0aGlzLCB0aGlzLm9uTG9naW4pO1xyXG4gICAgICAgICAgICBCQy5hZGRFdmVudCh0aGlzLCB0aGlzLmJ0bkluTG9naW4sIExheWEuRXZlbnQuQ0xJQ0ssIHRoaXMsIHRoaXMub25JbkxvZ2luKTtcclxuICAgICAgICAgICAgQkMuYWRkRXZlbnQodGhpcywgdGhpcy5pbWdTZXJ2ZXIsIExheWEuRXZlbnQuQ0xJQ0ssIHRoaXMsIHRoaXMub25TaG93U3J2KTtcclxuICAgICAgICAgICAgQkMuYWRkRXZlbnQodGhpcywgdGhpcy5idG5Ob3RpY2UsIExheWEuRXZlbnQuQ0xJQ0ssIHRoaXMsIHRoaXMuc2hvd05vdGljZSk7XHJcbiAgICAgICAgICAgIEJDLmFkZEV2ZW50KHRoaXMsIEV2ZW50TWFuYWdlciwgZ2xvYmFsRXZlbnQuTElOS19HRVRXQVksIHRoaXMsIHRoaXMub25MaW5rR2V0d2F5KTtcclxuICAgICAgICAgICAgQkMuYWRkRXZlbnQodGhpcywgRXZlbnRNYW5hZ2VyLCBnbG9iYWxFdmVudC5TSUdJSU5fU1VDQ0VTUywgdGhpcywgdGhpcy5zaG93QWNjb3VudCk7XHJcbiAgICAgICAgICAgIEJDLmFkZEV2ZW50KHRoaXMsIEV2ZW50TWFuYWdlciwgZ2xvYmFsRXZlbnQuU0VMRUNUX09ORV9TRVJWRVIsIHRoaXMsIHRoaXMudXBkYXRlQ3VyU3J2KTtcclxuICAgICAgICAgICAgQkMuYWRkRXZlbnQodGhpcywgdGhpcy50eHRGb3JnZXQsIExheWEuRXZlbnQuQ0xJQ0ssIHRoaXMsIHRoaXMub25Gb3JnZXQpO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIHByaXZhdGUgb25Gb3JnZXQoKSB7XHJcbiAgICAgICAgICAgIGlmIChMYXlhLlJlbmRlci5pc0NvbmNoQXBwKSB7XHJcbiAgICAgICAgICAgICAgICBjbGllbnRDb3JlLk5hdGl2ZU1nci5pbnN0YW5jZS5vcGVuVXJsKCdodHRwczovL2FjY291bnQuNjEuY29tL2ZvcmdldCcsIHRydWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgd2luZG93Lm9wZW4oJ2h0dHBzOi8vYWNjb3VudC42MS5jb20vZm9yZ2V0JywgJ19ibGFuaycpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgcmVtb3ZlRXZlbnRMaXN0ZW5lcnMoKTogdm9pZCB7XHJcbiAgICAgICAgICAgIEJDLnJlbW92ZUV2ZW50KHRoaXMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGluaXRPdmVyKCk6IHZvaWQge1xyXG4gICAgICAgICAgICBFdmVudE1hbmFnZXIuZXZlbnQoZ2xvYmFsRXZlbnQuTE9HSU5fT1BFTl9TVUMpO1xyXG4gICAgICAgICAgICAvLyDlhYhsb2Fk5b+F6KaB6LWE5rqQXHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlVmlldyhWaWV3VHlwZS5MT0FESU5HKTtcclxuICAgICAgICAgICAgLy8g6K+75Y+W5pys5Zyw6LSm5Y+35ZKM5a+G56CBXHJcbiAgICAgICAgICAgIGxldCBhY2NvdW50SWQ6IHN0cmluZyA9IHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShcInRtQWNjb3VudFwiKTtcclxuICAgICAgICAgICAgbGV0IHBhc3N3ZDogc3RyaW5nID0gd2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKFwidG1QYXNzd2RcIik7XHJcbiAgICAgICAgICAgIGxldCBpblVpZDogc3RyaW5nID0gd2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKFwidWlkXCIpO1xyXG4gICAgICAgICAgICBhY2NvdW50SWQgJiYgKHRoaXMuaW5wdXRaaC50ZXh0ID0gYWNjb3VudElkKTtcclxuICAgICAgICAgICAgcGFzc3dkICYmICh0aGlzLmlucHV0UHcudGV4dCA9IHBhc3N3ZCk7XHJcbiAgICAgICAgICAgIGluVWlkICYmICh0aGlzLmlucHV0SW5aaC50ZXh0ID0gaW5VaWQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHBvcHVwT3ZlcigpOiB2b2lkIHtcclxuICAgICAgICAgICAgbGV0IG5vdGljZXMgPSB4bHMuZ2V0KHhscy5ub3RpY2VCb2FyZCkuZ2V0VmFsdWVzKCkuZmlsdGVyKCh2KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgdDEgPSAobmV3IERhdGUodi5ub3RpY2VPcGVuKSkuZ2V0VGltZSgpO1xyXG4gICAgICAgICAgICAgICAgbGV0IHQyID0gKG5ldyBEYXRlKHYubm90aWNlQ2xvc2UpKS5nZXRUaW1lKCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgbm93ID0gKG5ldyBEYXRlKCkpLmdldFRpbWUoKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBub3cgPj0gdDEgJiYgbm93IDw9IHQyO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBpZiAobm90aWNlcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dOb3RpY2UoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvd1ByaXZhY3koKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvKiog5re75Yqg54mI5pys5Y+3Ki9cclxuICAgICAgICAgICAgdGhpcy50eFZlcnNpb24udGV4dCA9IGBhcHA6JHtjbGllbnRDb3JlLk5hdGl2ZU1nci5pbnN0YW5jZS5nZXRBcHBWZXJzaW9uKCl9IHZlcjpgO1xyXG4gICAgICAgICAgICByZXMubG9hZCgndXBkYXRlL2Fzc2V0c2lkLnR4dCcpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudHhWZXJzaW9uKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudHhWZXJzaW9uLnRleHQgKz0gcmVzLmdldCgndXBkYXRlL2Fzc2V0c2lkLnR4dCcpIGFzIHN0cmluZztcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLyoqIOeOsOWcqOebtOaOpeW8gOWniyovXHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlVmlldyhWaWV3VHlwZS5TVEFSVCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHNob3dOb3RpY2UoKSB7XHJcbiAgICAgICAgICAgIGlmIChjbGllbnRDb3JlLkdsb2JhbENvbmZpZy5pc0lvc1Rlc3QpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIHRoaXMuX25vdGljZVBhbmVsID0gdGhpcy5fbm90aWNlUGFuZWwgfHwgbmV3IHBhbmVsLk5vdGljZVBhbmVsKCk7XHJcbiAgICAgICAgICAgIGNsaWVudENvcmUuRGlhbG9nTWdyLmlucy5vcGVuKHRoaXMuX25vdGljZVBhbmVsKTtcclxuICAgICAgICAgICAgdGhpcy5fbm90aWNlUGFuZWwub25jZShMYXlhLkV2ZW50LkNMT1NFLCB0aGlzLCB0aGlzLnNob3dQcml2YWN5KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgc2hvd1ByaXZhY3koKSB7XHJcbiAgICAgICAgICAgIC8v5Y+q5pyJ5a6Y5pyN5bGV56S66ZqQ56eB5YWs56S6XHJcbiAgICAgICAgICAgIGlmICghY2hhbm5lbC5DaGFubmVsQ29udHJvbC5pbnMuaXNPZmZpY2lhbClcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgaWYgKGNsaWVudENvcmUuR2xvYmFsQ29uZmlnLmlzSW9zVGVzdClcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgbGV0IGhhdmVTaG93ID0gTGF5YS5Mb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnSEFWRV9TSE9XX1BSSVZBQ0FZJykgPT0gJ3RydWUnO1xyXG4gICAgICAgICAgICBpZiAoIWhhdmVTaG93KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9wcml2YWN5UGFuZWwgPSB0aGlzLl9wcml2YWN5UGFuZWwgfHwgbmV3IHBhbmVsLlByaXZhY3lQYW5lbCgpO1xyXG4gICAgICAgICAgICAgICAgY2xpZW50Q29yZS5EaWFsb2dNZ3IuaW5zLm9wZW4odGhpcy5fcHJpdmFjeVBhbmVsKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIHB1YmxpYyBkZXN0cm95KCk6IHZvaWQge1xyXG4gICAgICAgICAgICBzdXBlci5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgIHRoaXMuX3ByaXZhY3lQYW5lbD8uZGVzdHJveSgpO1xyXG4gICAgICAgICAgICB0aGlzLl9ub3RpY2VQYW5lbD8uZGVzdHJveSgpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fc3J2cykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fc3J2cy5sZW5ndGggPSAwO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX3NydlBhbmVsKVxyXG4gICAgICAgICAgICAgICAgICAgIGNsaWVudENvcmUuRGlhbG9nTWdyLmlucy5jbG9zZSh0aGlzLl9zcnZQYW5lbCwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fc3J2cyA9IHRoaXMuX3NydlBhbmVsID0gdGhpcy5fc2VyaWFsUGFuZWwgPSB0aGlzLl9yZWdpc3RlclBhbmVsID0gdGhpcy5fYWNjb3VudFBhbmVsID0gdGhpcy5fc2VsZWN0U3J2ID0gbnVsbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzaG93TG9naW4oZTogTGF5YS5FdmVudCk6IHZvaWQge1xyXG4gICAgICAgICAgICBzd2l0Y2ggKGNoYW5uZWwuQ2hhbm5lbENvbmZpZy5jaGFubmVsSWQpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgY2hhbm5lbC5DaGFubmVsRW51bS5JTlRFUklPUjpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVZpZXcoVmlld1R5cGUuSU5TVEVSSU9SKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgY2hhbm5lbC5DaGFubmVsRW51bS5UQU9NRUU6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVWaWV3KFZpZXdUeXBlLlNJR05JTik7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIGNoYW5uZWwuQ2hhbm5lbEVudW0uSU9TOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlVmlldyhWaWV3VHlwZS5TSUdOSU4pO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBjaGFubmVsLkNoYW5uZWxDb250cm9sLmlucy5sb2dpbigpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHVwZGF0ZVZpZXcodHlwZTogVmlld1R5cGUpOiB2b2lkIHtcclxuICAgICAgICAgICAgdGhpcy5ib3hMb2FkLnZpc2libGUgPSB0eXBlID09IFZpZXdUeXBlLkxPQURJTkc7XHJcbiAgICAgICAgICAgIHRoaXMuYm94U3RhcnQudmlzaWJsZSA9IHR5cGUgPT0gVmlld1R5cGUuU1RBUlQ7XHJcbiAgICAgICAgICAgIHRoaXMuYm94U2lnbi52aXNpYmxlID0gdHlwZSA9PSBWaWV3VHlwZS5TSUdOSU47XHJcbiAgICAgICAgICAgIHRoaXMuYm94U2VydmVyLnZpc2libGUgPSB0eXBlID09IFZpZXdUeXBlLlNFUlZFUl9MSVNUO1xyXG4gICAgICAgICAgICB0aGlzLmJveEluc3Rlcmlvci52aXNpYmxlID0gdHlwZSA9PSBWaWV3VHlwZS5JTlNURVJJT1I7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHVwZGF0ZUJhcih0aXBTdHI6IHN0cmluZywgdmFsdWU6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgICAgICBpZiAoY2xpZW50Q29yZS5HbG9iYWxDb25maWcuaXNJb3NUZXN0KVxyXG4gICAgICAgICAgICAgICAgdGhpcy50eFRpcC50ZXh0ID0gJ+ato+WcqOi/m+WFpea4uOaIj++8jOivt+eojeWQjuOAguOAguOAgidcclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgdGhpcy50eFRpcC5jaGFuZ2VUZXh0KHRpcFN0cik7XHJcbiAgICAgICAgICAgIExheWEuVHdlZW4udG8odGhpcy5pbWdQcm8sIHsgd2lkdGg6IHZhbHVlIC8gMTAwICogMTA4MyB9LCAzMDAsIG51bGwsIExheWEuSGFuZGxlci5jcmVhdGUodGhpcywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgRXZlbnRNYW5hZ2VyLmV2ZW50KGdsb2JhbEV2ZW50LkJFQU5fTE9BRF9QUk9fU1VDKTtcclxuICAgICAgICAgICAgICAgIHZhbHVlID49IDEwMCAmJiB0aGlzLnVwZGF0ZVZpZXcoVmlld1R5cGUuU1RBUlQpO1xyXG4gICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgICAgIExheWEuVHdlZW4udG8odGhpcy5pbWdGbG93ZXIsIHsgeDogKHRoaXMuaW1nUHJvLnggKyB2YWx1ZSAvIDEwMCAqIDEwODMpIH0sIDMwMCwgbnVsbCwgbnVsbCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIG9uUmVnaXN0ZXIoKTogdm9pZCB7XHJcbiAgICAgICAgICAgIHRoaXMuX3JlZ2lzdGVyUGFuZWwgPSB0aGlzLl9yZWdpc3RlclBhbmVsIHx8IG5ldyBwYW5lbC5SZWdQYW5lbCgpO1xyXG4gICAgICAgICAgICB0aGlzLl9yZWdpc3RlclBhbmVsLnNob3coKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKiDlhoXpg6jnmbvlvZUqL1xyXG4gICAgICAgIHByaXZhdGUgb25JbkxvZ2luKCk6IHZvaWQge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5pbnB1dEluWmgudGV4dCA9PSBcIlwiKSB7XHJcbiAgICAgICAgICAgICAgICBhbGVydC5zaG93RldvcmRzKFwi6LSm5Y+35LiN6IO95Li656m6flwiKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyDlhoXpg6jnmbvlvZVcclxuICAgICAgICAgICAgaWYgKGNoYW5uZWwuQ2hhbm5lbENvbmZpZy5jaGFubmVsSWQgPT0gY2hhbm5lbC5DaGFubmVsRW51bS5JTlRFUklPUikge1xyXG4gICAgICAgICAgICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKFwidWlkXCIsIHRoaXMuaW5wdXRJblpoLnRleHQpO1xyXG4gICAgICAgICAgICAgICAgRXZlbnRNYW5hZ2VyLmV2ZW50KGdsb2JhbEV2ZW50LlNZTl9BQ0NPVU5ULCBbTnVtYmVyKHRoaXMuaW5wdXRJblpoLnRleHQpLCBOdW1iZXIodGhpcy5pbnB1dEFnZS50ZXh0KV0pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgb25Mb2dpbigpOiB2b2lkIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuaW5wdXRaaC50ZXh0ID09IFwiXCIpIHtcclxuICAgICAgICAgICAgICAgIGFsZXJ0LnNob3dGV29yZHMoXCLotKblj7fkuI3og73kuLrnqbp+XCIpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIOa3mOexs+eZu+W9lVxyXG4gICAgICAgICAgICBpZiAoY2hhbm5lbC5DaGFubmVsQ29uZmlnLmNoYW5uZWxJZCA9PSBjaGFubmVsLkNoYW5uZWxFbnVtLlRBT01FRSB8fCBjaGFubmVsLkNoYW5uZWxDb25maWcuY2hhbm5lbElkID09IGNoYW5uZWwuQ2hhbm5lbEVudW0uSU9TKSB7XHJcbiAgICAgICAgICAgICAgICAvL+acrOWcsOiusOW9lei0puWPt+WvhueggVxyXG4gICAgICAgICAgICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKFwidG1BY2NvdW50XCIsIHRoaXMuaW5wdXRaaC50ZXh0KTtcclxuICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShcInRtUGFzc3dkXCIsIHRoaXMuaW5wdXRQdy50ZXh0KTtcclxuICAgICAgICAgICAgICAgIEV2ZW50TWFuYWdlci5ldmVudChnbG9iYWxFdmVudC5TWU5fQUNDT1VOVCwgW3RoaXMuaW5wdXRaaC50ZXh0LCB0aGlzLmlucHV0UHcudGV4dF0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiog5bGV56S65r+A5rS756CBKi9cclxuICAgICAgICBwcml2YXRlIHNob3dTZXJpYWwoc3VjOiBGdW5jdGlvbik6IHZvaWQge1xyXG4gICAgICAgICAgICB0aGlzLl9zZXJpYWxQYW5lbCA9IHRoaXMuX3NlcmlhbFBhbmVsIHx8IG5ldyBwYW5lbC5TZXJpYWxQYW5lbCgpO1xyXG4gICAgICAgICAgICB0aGlzLl9zZXJpYWxQYW5lbC5zaG93KHN1Yyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiog5bGV56S66LSm5Y+3Ki9cclxuICAgICAgICBwcml2YXRlIHNob3dBY2NvdW50KGFjY291bnRJZDogbnVtYmVyLCBwYXNzV2Q6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgICAgICAgICB0aGlzLl9hY2NvdW50UGFuZWwgPSB0aGlzLl9hY2NvdW50UGFuZWwgfHwgbmV3IHBhbmVsLkFjY291bnRQYW5lbCgpO1xyXG4gICAgICAgICAgICB0aGlzLl9hY2NvdW50UGFuZWwuc2hvdyhhY2NvdW50SWQsIHBhc3NXZCk7XHJcbiAgICAgICAgICAgIHRoaXMuaW5wdXRaaC50ZXh0ID0gYWNjb3VudElkICsgXCJcIjtcclxuICAgICAgICAgICAgdGhpcy5pbnB1dFB3LnRleHQgPSBwYXNzV2Q7XHJcbiAgICAgICAgICAgIHRoaXMuX3JlZ2lzdGVyUGFuZWw/LmhpZGUoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKiDov57mjqVnZXR3YXkqL1xyXG4gICAgICAgIHByaXZhdGUgYXN5bmMgb25MaW5rR2V0d2F5KCkge1xyXG4gICAgICAgICAgICBsZXQgdWlkOiBudW1iZXIgPSBjbGllbnRDb3JlLkdsb2JhbENvbmZpZy51aWQ7XHJcbiAgICAgICAgICAgIGNsaWVudENvcmUuTG9jYWxJbmZvLnVpZCA9IHVpZDtcclxuICAgICAgICAgICAgbGV0IHJhbiA9IF8ucmFuZG9tKDAsIGNoYW5uZWwuQ2hhbm5lbENvbmZpZy5nZXR3YXlzLmxlbmd0aCAtIDEsIGZhbHNlKTtcclxuICAgICAgICAgICAgbGV0IHNydkFkcmVzczogc3RyaW5nID0gY2hhbm5lbC5DaGFubmVsQ29uZmlnLmdldHdheXNbcmFuXTtcclxuICAgICAgICAgICAgaWYgKHNydkFkcmVzcykge1xyXG4gICAgICAgICAgICAgICAgLy8g6L+e5o6l5YiwZ2V0d2F5XHJcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVZpZXcoVmlld1R5cGUuTk9ORSk7XHJcbiAgICAgICAgICAgICAgICBhd2FpdCBuZXQuY29ubmVjdChzcnZBZHJlc3MsIHVpZCk7XHJcbiAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLndhaXRDaGVja1NlcmlhbCgpO1xyXG4gICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5nZXRTcnZMaXN0KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKiDojrflj5bmnI3liqHlmajliJfooagqL1xyXG4gICAgICAgIHByaXZhdGUgYXN5bmMgZ2V0U3J2TGlzdCgpIHtcclxuICAgICAgICAgICAgYXdhaXQgbmV0LnNlbmRBbmRXYWl0KG5ldyBwYi5jc19nYXRld2F5X2dldF9vbmxpbmVfbGlzdCh7IGFjY291bnQ6IHRoaXMuaW5wdXRaaC50ZXh0IH0pKS50aGVuKChkYXRhOiBwYi5zY19nYXRld2F5X2dldF9vbmxpbmVfbGlzdCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVWaWV3KFZpZXdUeXBlLlNFUlZFUl9MSVNUKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3NydnMgPSBkYXRhLm9ubGluZXM7XHJcbiAgICAgICAgICAgICAgICBjbGllbnRDb3JlLkxvZ2dlci5zZW5kTG9nKCfmlbDmja7ln4vngrknLCAn5ri45oiP55m76ZmG57uf6K6hJywgJ+iOt+WPluacjeWKoeWZqOWIl+ihqOaIkOWKnycpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVDdXJTcnYodGhpcy5nZXRGcmVlU3J2KHRoaXMuX3NydnMpKTtcclxuICAgICAgICAgICAgfSkuY2F0Y2goKGUpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICghTGF5YS5SZW5kZXIuaXNDb25jaEFwcCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGFsZXJ0LnNob3dTbWFsbChcIuacjeWKoeWZqOato+WcqOe7tOaKpOS4reWTpl5fXlwiKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnISEhIScgKyBlKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVWaWV3KFZpZXdUeXBlLlNUQVJUKTtcclxuICAgICAgICAgICAgICAgICAgICBCQy5hZGRFdmVudCh0aGlzLCB0aGlzLmJveFN0YXJ0LCBMYXlhLkV2ZW50LkNMSUNLLCB0aGlzLCB0aGlzLnNob3dUU3J2RXJyKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9ub3RpY2VQYW5lbCA/ICh0aGlzLl9ub3RpY2VQYW5lbC5jbG9zZUhhbmRsZXIgPSBMYXlhLkhhbmRsZXIuY3JlYXRlKHRoaXMsIHRoaXMuc2hvd1RTcnZFcnIpKSA6IHRoaXMuc2hvd1RTcnZFcnIoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKiDlnKhhcHDkuK3mmL7npLrmnI3liqHlmajplJnor68qL1xyXG4gICAgICAgIHByaXZhdGUgc2hvd1RTcnZFcnIoKTogdm9pZCB7XHJcbiAgICAgICAgICAgIGlmICghTGF5YS5SZW5kZXIuaXNDb25jaEFwcCB8fCB0aGlzLl9zcnZzICE9IHZvaWQgMCkgcmV0dXJuO1xyXG4gICAgICAgICAgICBhbGVydC5zaG93U21hbGwoeGxzLmdldCh4bHMuc2VydmVyTWFpbnRlbmFuY2UpLmdldCgxKS5kZXNjSW5mbywge1xyXG4gICAgICAgICAgICAgICAgYnRuVHlwZTogYWxlcnQuQnRuX1R5cGUuT05MWV9TVVJFLFxyXG4gICAgICAgICAgICAgICAgbmVlZENsb3NlOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIGNsaWNrTWFza0Nsb3NlOiBmYWxzZVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqIOabtOaWsOW9k+WJjeacjeWKoeWZqCovXHJcbiAgICAgICAgcHJpdmF0ZSB1cGRhdGVDdXJTcnYobXNnOiBwYi5Jb25saW5lSW5mbyk6IHZvaWQge1xyXG4gICAgICAgICAgICB0aGlzLl9zZWxlY3RTcnYgPSBtc2c7XHJcbiAgICAgICAgICAgIHRoaXMudHhTdGF0dXMudmlzaWJsZSA9IG1zZy5zdGF0dXMgPT0gNDtcclxuICAgICAgICAgICAgbGV0IF94bHNEYXRhID0geGxzLmdldCh4bHMuc2VydmVyTmFtZSk7XHJcbiAgICAgICAgICAgIGxldCBuYW1lID0gX3hsc0RhdGEuaGFzKG1zZy5pZCAlIDEwMDAwKSA/IF94bHNEYXRhLmdldChtc2cuaWQgJSAxMDAwMCkuc2VydmVyTmFtZSA6IF94bHNEYXRhLmdldChtc2cuaWQgJSA2MDApPy5zZXJ2ZXJOYW1lO1xyXG4gICAgICAgICAgICB0aGlzLnR4U3J2TmFtZS50ZXh0ID0gbmFtZSA/IG5hbWUgOiAnICc7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGdldEZyZWVTcnYoYXJyOiBwYi5Jb25saW5lSW5mb1tdKTogcGIuSW9ubGluZUluZm8ge1xyXG4gICAgICAgICAgICBsZXQgYXJyYXk6IHBiLklvbmxpbmVJbmZvW10gPSBbXTtcclxuICAgICAgICAgICAgbGV0IGFycl8xOiBwYi5Jb25saW5lSW5mb1tdID0gW107XHJcbiAgICAgICAgICAgIGxldCBhcnJfNDogcGIuSW9ubGluZUluZm9bXSA9IFtdO1xyXG4gICAgICAgICAgICBfLmZvckVhY2goYXJyLCAoZWxlbWVudDogcGIuSW9ubGluZUluZm8pID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChlbGVtZW50LnN0YXR1cyA9PSAyIHx8IGVsZW1lbnQuc3RhdHVzID09IDMpIHtcclxuICAgICAgICAgICAgICAgICAgICBhcnJheS5wdXNoKGVsZW1lbnQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGVsZW1lbnQuc3RhdHVzID09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICBhcnJfMS5wdXNoKGVsZW1lbnQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGVsZW1lbnQuc3RhdHVzID09IDQpIHtcclxuICAgICAgICAgICAgICAgICAgICBhcnJfNC5wdXNoKGVsZW1lbnQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBsZXQgbGVuOiBudW1iZXIgPSBhcnJheS5sZW5ndGg7XHJcbiAgICAgICAgICAgIGlmIChsZW4gPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgcmFuOiBudW1iZXIgPSBfLnJhbmRvbSgwLCBsZW4gLSAxLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gYXJyYXlbcmFuXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZW4gPSBhcnJfMS5sZW5ndGg7XHJcbiAgICAgICAgICAgIGlmIChsZW4gPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgcmFuOiBudW1iZXIgPSBfLnJhbmRvbSgwLCBsZW4gLSAxLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gYXJyXzFbcmFuXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZW4gPSBhcnJfNC5sZW5ndGg7XHJcbiAgICAgICAgICAgIGlmIChsZW4gPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgcmFuOiBudW1iZXIgPSBfLnJhbmRvbSgwLCBsZW4gLSAxLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gYXJyXzRbcmFuXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRTdWl0YWJsZVNydihhcnIpO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIC8qKiDlr7vmib7lkIjpgILnmoTmnI3liqHlmagqL1xyXG4gICAgICAgIHByaXZhdGUgZ2V0U3VpdGFibGVTcnYoYXJyOiBwYi5Jb25saW5lSW5mb1tdKTogcGIuSW9ubGluZUluZm8ge1xyXG4gICAgICAgICAgICBhcnIuc29ydCgoczEsIHMyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoczEuc3RhdHVzID09IDIpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gLTFcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHMxLnN0YXR1cyA8IHMyLnN0YXR1cykge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAtMTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiAxO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAvLyBsZXQgcmFuID0gXy5yYW5kb20oMCwgYXJyLmxlbmd0aCAtIDEsIGZhbHNlKTtcclxuICAgICAgICAgICAgcmV0dXJuIGFyclswXTsgLy/kvJjlhYjmjqjojZBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKiDmiZPlvIDmnI3liqHlmajliJfooagqL1xyXG4gICAgICAgIHByaXZhdGUgb25TaG93U3J2KCk6IHZvaWQge1xyXG4gICAgICAgICAgICB0aGlzLl9zcnZQYW5lbCA9IHRoaXMuX3NydlBhbmVsIHx8IG5ldyBwYW5lbC5TZXJ2ZXJQYW5lbCgpO1xyXG4gICAgICAgICAgICB0aGlzLl9zcnZQYW5lbC5zaG93KHRoaXMuX3NydnMpO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIHByaXZhdGUgX25vd0xvZ2luaW5nOiBib29sZWFuO1xyXG4gICAgICAgIC8qKiDmuLjmiI/nmbvlvZUqL1xyXG4gICAgICAgIHByaXZhdGUgYXN5bmMgb25HYW1lTG9naW4oZTogTGF5YS5FdmVudCk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuX3NlbGVjdFNydikge1xyXG4gICAgICAgICAgICAgICAgYWxlcnQuc2hvd0ZXb3JkcyhcIuacjeWKoeWZqOe7tOaKpOS4rX5cIik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRoaXMuX3NlbGVjdFNydi5zdGF0dXMgPT0gNCkge1xyXG4gICAgICAgICAgICAgICAgYWxlcnQuc2hvd0ZXb3JkcyhcIuacjeWKoeWZqOW3sue7j+eIhua7oeWVplFhUVwiKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGhpcy5fbm93TG9naW5pbmcpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoZS50YXJnZXQgaW5zdGFuY2VvZiBMYXlhLkltYWdlKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2xpZW50Q29yZS5Mb2dnZXIuc2VuZExvZygn5pWw5o2u5Z+L54K5JywgJ+a4uOaIj+eZu+mZhue7n+iuoScsICfngrnlh7vnmbvpmYYnKTtcclxuICAgICAgICAgICAgLyoqIOe7iOerryAxLXdlYiAyLWFuZHJvaWQgMy1pb3MqL1xyXG4gICAgICAgICAgICB0aGlzLl9ub3dMb2dpbmluZyA9IHRydWU7XHJcbiAgICAgICAgICAgIC8qKiDmn6Xor6Llrp7lkI3orqTor4Et56ys5LiA5qyh5rKh5pyJ5p+l6K+i5YiwKi9cclxuICAgICAgICAgICAgYXdhaXQgY2hhbm5lbC5DaGFubmVsQ29udHJvbC5pbnMucXVlcnlBbnRpQWRkaWN0aW9uKFwi56ys5LqM5qyh5a6e5ZCN6K6k6K+B5p+l6K+iLi4uXCIpO1xyXG4gICAgICAgICAgICBuZXQuc2VuZEFuZFdhaXQobmV3IHBiLmNzX2dhdGV3YXlfZW50ZXJfc2VydmVyKHtcclxuICAgICAgICAgICAgICAgIG9ubGluZUlkOiB0aGlzLl9zZWxlY3RTcnYuaWQsXHJcbiAgICAgICAgICAgICAgICBhY2NvdW50OiBjb3JlLlNpZ25NZ3IudXNlU2lnbiA/IGNvcmUuU2lnbk1nci51aWQgKyBcIlwiIDogY2hhbm5lbC5DaGFubmVsQ29uZmlnLmNoYW5uZWxVc2VySUQudG9TdHJpbmcoKSxcclxuICAgICAgICAgICAgICAgIGNoYW5uZWw6IGNoYW5uZWwuQ2hhbm5lbENvbmZpZy5jaGFubmVsSWQsXHJcbiAgICAgICAgICAgICAgICBzdWJDaGFubmVsOiBjaGFubmVsLkNoYW5uZWxDb25maWcuc3ViQ2hhbm5lbElkLFxyXG4gICAgICAgICAgICAgICAgdG9rZW46IGNvcmUuU2lnbk1nci51c2VTaWduID8gY29yZS5TaWduTWdyLnRva2VuIDogY2xpZW50Q29yZS5HbG9iYWxDb25maWcudG9rZW4sXHJcbiAgICAgICAgICAgICAgICBwaG9uZU9TOiBMYXlhLkJyb3dzZXIub25BbmRyb2lkID8gMiA6IChMYXlhLkJyb3dzZXIub25JT1MgPyAzIDogMSksXHJcbiAgICAgICAgICAgICAgICBtYWNBZGRyZXNzOiBjbGllbnRDb3JlLk5hdGl2ZU1nci5pbnN0YW5jZS5nZXRJTUVJKClcclxuICAgICAgICAgICAgfSkpLnRoZW4oKGRhdGE6IHBiLnNjX2dhdGV3YXlfZW50ZXJfc2VydmVyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjbGllbnRDb3JlLkdsb2JhbENvbmZpZy5zZXJ2ZXJJZCA9IHRoaXMuX3NlbGVjdFNydi5pZDtcclxuICAgICAgICAgICAgICAgIGNsaWVudENvcmUuR2xvYmFsQ29uZmlnLnNlcnZlck5hbWUgPSB0aGlzLl9zZWxlY3RTcnYubmFtZTtcclxuICAgICAgICAgICAgICAgIGNsaWVudENvcmUuR2xvYmFsQ29uZmlnLnNlcnZlclNob3dOYW1lID0gdGhpcy50eFNydk5hbWUudGV4dDtcclxuICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnaGlzdG9yeV9zZXJ2ZXJfaWQnLCB0aGlzLl9zZWxlY3RTcnYuaWQgKyAnJyk7XHJcbiAgICAgICAgICAgICAgICAvKiog6YCJ5oup5aW95pyN5Yqh5Zmo55m75b2VKi9cclxuICAgICAgICAgICAgICAgIGNoYW5uZWwuQ2hhbm5lbENvbnRyb2wuaW5zLnJlcG9ydFJvbGVEYXRhKDEpO1xyXG4gICAgICAgICAgICAgICAgbGV0IHJlYWw6IGNsaWVudENvcmUuUmVhbE1hbmFnZXIgPSBjbGllbnRDb3JlLlJlYWxNYW5hZ2VyLmlucztcclxuICAgICAgICAgICAgICAgIHJlYWwub25saW5lVGltZSA9IGRhdGEudG9kYXlPbmxpbmU7XHJcbiAgICAgICAgICAgICAgICByZWFsLnJlY2hhcmdlQ250ID0gZGF0YS5wYXlDb3VudDtcclxuICAgICAgICAgICAgICAgIHJlYWwuc3RhcnRTZXJ2ZXJUaW1lID0gY2xpZW50Q29yZS5TZXJ2ZXJNYW5hZ2VyLmN1clNlcnZlclRpbWUgPSBkYXRhLmN1clRpbWVzdGFtcDtcclxuICAgICAgICAgICAgICAgIHJlYWwuY2hlY2tQbGF5R2FtZSgpICYmIHRoaXMubG9naW5TdWMoZGF0YSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9ub3dMb2dpbmluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9KS5jYXRjaChlID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMubG9naW5GYWlsKCdsb2dpbuWksei0pScpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fbm93TG9naW5pbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiog55m75b2V5oiQ5YqfKi9cclxuICAgICAgICBwcml2YXRlIGxvZ2luU3VjKGRhdGE6IHBiLnNjX2dhdGV3YXlfZW50ZXJfc2VydmVyKTogdm9pZCB7XHJcbiAgICAgICAgICAgIGNsaWVudENvcmUuTG9nZ2VyLnNlbmRMb2coJ+aVsOaNruWfi+eCuScsICfmuLjmiI/nmbvpmYbnu5/orqEnLCAn55m76ZmG5oiQ5YqfJyk7XHJcbiAgICAgICAgICAgIHRoaXMuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICBjbGllbnRDb3JlLkxvY2FsSW5mby5zZXRVc2VyQ3JlYXRlKGRhdGEpO1xyXG4gICAgICAgICAgICBFdmVudE1hbmFnZXIuZXZlbnQoZ2xvYmFsRXZlbnQuRU5URVJfR0VNRV9TVUMpO1xyXG4gICAgICAgICAgICBFdmVudE1hbmFnZXIuZXZlbnQoXCJMT0dJTl9TVUNDRVNTXCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBsb2dpbkZhaWwodGlwczogc3RyaW5nKSB7XHJcbiAgICAgICAgICAgIGFsZXJ0LnNob3dGV29yZHModGlwcyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiog562J5b6F5qOA5p+l5r+A5rS756CBKi9cclxuICAgICAgICBwcml2YXRlIHdhaXRDaGVja1NlcmlhbCgpOiBQcm9taXNlPGFueT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHN1YykgPT4ge1xyXG4gICAgICAgICAgICAgICAgbmV0LnNlbmRBbmRXYWl0KG5ldyBwYi5jc19nZXRfdXNlcl9jb2RlX3N0YXR1cyh7IGFjY291bnQ6IHRoaXMuaW5wdXRaaC50ZXh0IH0pKS50aGVuKChtc2c6IHBiLnNjX2dldF91c2VyX2NvZGVfc3RhdHVzKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbXNnLnJlc3VsdCA9PSAwID8gdGhpcy5zaG93U2VyaWFsKHN1YykgOiBzdWMoKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwiXHJcblxyXG5uYW1lc3BhY2UgbG9naW4yLnBhbmVsIHtcclxuICAgIC8qKlxyXG4gICAgICog6LSm5Y+35bGV56S6XHJcbiAgICAgKi9cclxuICAgIGV4cG9ydCBjbGFzcyBBY2NvdW50UGFuZWwgZXh0ZW5kcyB1aS5sb2dpbjIucGFuZWwuQWNjb3VudFVJIHtcclxuXHJcbiAgICAgICAgcHVibGljIHNpZGVDbG9zZSA9IGZhbHNlO1xyXG5cclxuICAgICAgICBjb25zdHJ1Y3RvcigpIHsgc3VwZXIoKTsgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc2hvdyhhY2NvdW50SWQ6IG51bWJlciwgcGFzc1dkOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgICAgICAgICAgY2xpZW50Q29yZS5EaWFsb2dNZ3IuaW5zLm9wZW4odGhpcyk7XHJcbiAgICAgICAgICAgIHRoaXMudHhBY2NvdW50LmNoYW5nZVRleHQoYWNjb3VudElkICsgXCJcIik7XHJcbiAgICAgICAgICAgIHRoaXMudHhQYXNzd2QuY2hhbmdlVGV4dChwYXNzV2QpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGFkZEV2ZW50TGlzdGVuZXJzKCk6IHZvaWQge1xyXG4gICAgICAgICAgICBCQy5hZGRFdmVudCh0aGlzLCB0aGlzLmJ0bkxvZ2luLCBMYXlhLkV2ZW50LkNMSUNLLCB0aGlzLCB0aGlzLmhpZGUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHJlbW92ZUV2ZW50TGlzdGVuZXJzKCk6IHZvaWQge1xyXG4gICAgICAgICAgICBCQy5yZW1vdmVFdmVudCh0aGlzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgaGlkZSgpOiB2b2lkIHtcclxuICAgICAgICAgICAgY2xpZW50Q29yZS5EaWFsb2dNZ3IuaW5zLmNsb3NlKHRoaXMpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsIm5hbWVzcGFjZSBsb2dpbjIucGFuZWwge1xyXG4gICAgZXhwb3J0IGNsYXNzIE5vdGljZVBhbmVsIGV4dGVuZHMgdWkubG9naW4yLnBhbmVsLk5vdGljZVBhbmVsVUkge1xyXG5cclxuICAgICAgICBwdWJsaWMgY2xvc2VIYW5kbGVyOiBMYXlhLkhhbmRsZXI7XHJcblxyXG4gICAgICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgICAgICB0aGlzLnNpZGVDbG9zZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmxpc3QudlNjcm9sbEJhclNraW4gPSBudWxsO1xyXG4gICAgICAgICAgICB0aGlzLmxpc3Quc2VsZWN0RW5hYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5saXN0LnJlbmRlckhhbmRsZXIgPSBuZXcgTGF5YS5IYW5kbGVyKHRoaXMsIHRoaXMub25MaXN0UmVuZGVyKTtcclxuICAgICAgICAgICAgdGhpcy5saXN0LnNlbGVjdEhhbmRsZXIgPSBuZXcgTGF5YS5IYW5kbGVyKHRoaXMsIHRoaXMub25MaXN0U2VsZWN0SGFubGRlcik7XHJcbiAgICAgICAgICAgIGxldCBhcnIgPSB4bHMuZ2V0KHhscy5ub3RpY2VCb2FyZCkuZ2V0VmFsdWVzKCk7XHJcbiAgICAgICAgICAgIHRoaXMubGlzdC5kYXRhU291cmNlID0gYXJyLmZpbHRlcigodikgPT4ge1xyXG4gICAgICAgICAgICAgICAgbGV0IHQxID0gKG5ldyBEYXRlKHYubm90aWNlT3BlbikpLmdldFRpbWUoKTtcclxuICAgICAgICAgICAgICAgIGxldCB0MiA9IChuZXcgRGF0ZSh2Lm5vdGljZUNsb3NlKSkuZ2V0VGltZSgpO1xyXG4gICAgICAgICAgICAgICAgbGV0IG5vdyA9IChuZXcgRGF0ZSgpKS5nZXRUaW1lKCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgbmVlZFR5cGUgPSBjaGFubmVsLkNoYW5uZWxDb250cm9sLmlucy5pc09mZmljaWFsID8gMSA6IDI7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbm93ID49IHQxICYmIG5vdyA8PSB0MiAmJiAobmVlZFR5cGUgPT0gdi5pc09mZmljYWwgfHwgdi5pc09mZmljYWwgPT0gMCk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIHRoaXMudHh0VGl0bGUudGV4dCA9ICcnO1xyXG4gICAgICAgICAgICB0aGlzLnR4dERlc2MudGV4dCA9ICcnO1xyXG4gICAgICAgICAgICB0aGlzLmxpc3Quc2VsZWN0ZWRJbmRleCA9IHRoaXMubGlzdC5kYXRhU291cmNlLmxlbmd0aCA+IDAgPyAwIDogLTE7XHJcbiAgICAgICAgICAgIHRoaXMucGFuZWwudlNjcm9sbEJhclNraW4gPSBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gcHJpdmF0ZSBnZXRUaW1lKHN0cjogc3RyaW5nKSB7XHJcbiAgICAgICAgLy8gICAgIGxldCBhcnIgPSBfLm1hcChzdHIuc3BsaXQoJy0nKSwgKHMpID0+IHtcclxuICAgICAgICAvLyAgICAgICAgIHJldHVybiBwYXJzZUludChzKTtcclxuICAgICAgICAvLyAgICAgfSk7XHJcbiAgICAgICAgLy8gICAgIGxldCB0ID0gbmV3IERhdGUoYXJyWzBdLCBhcnJbMV0gLSAxLCBhcnJbMl0pO1xyXG4gICAgICAgIC8vICAgICByZXR1cm4gdC5nZXRUaW1lKCk7XHJcbiAgICAgICAgLy8gfVxyXG5cclxuICAgICAgICBwcml2YXRlIG9uTGlzdFJlbmRlcihib3g6IExheWEuQm94LCBpZHg6IG51bWJlcikge1xyXG4gICAgICAgICAgICBsZXQgZGF0YSA9IGJveC5kYXRhU291cmNlIGFzIHhscy5ub3RpY2VCb2FyZDtcclxuICAgICAgICAgICAgKGJveC5nZXRDaGlsZEJ5TmFtZSgnY2xpcEJnJykgYXMgTGF5YS5DbGlwKS5pbmRleCA9IHRoaXMubGlzdC5zZWxlY3RlZEluZGV4ID09IGlkeCA/IDAgOiAxO1xyXG4gICAgICAgICAgICAoYm94LmdldENoaWxkQnlOYW1lKCdjbGlwSGVhZCcpIGFzIExheWEuQ2xpcCkuaW5kZXggPSBkYXRhLm5vdGljZVR5cGUgPT0gMSA/IDAgOiAxO1xyXG4gICAgICAgICAgICAoYm94LmdldENoaWxkQnlOYW1lKCd0eHQnKSBhcyBMYXlhLkxhYmVsKS50ZXh0ID0gZGF0YS5ub3RpY2VUaXRsZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgb25MaXN0U2VsZWN0SGFubGRlcihpZHg6IG51bWJlcikge1xyXG4gICAgICAgICAgICBsZXQgZGF0YSA9IHRoaXMubGlzdC5zZWxlY3RlZEl0ZW0gYXMgeGxzLm5vdGljZUJvYXJkO1xyXG4gICAgICAgICAgICB0aGlzLnR4dFRpdGxlLnRleHQgPSBkYXRhLm5vdGljZVRpdGxlO1xyXG4gICAgICAgICAgICB0aGlzLnR4dERlc2MudGV4dCA9IGRhdGEubm90aWNlRGVzO1xyXG4gICAgICAgICAgICB0aGlzLmltZy5za2luID0gcGF0aENvbmZpZy5nZXROb3RpY2VJbWcoZGF0YS5pbWcpO1xyXG4gICAgICAgICAgICB0aGlzLnBhbmVsLmhlaWdodCA9IGRhdGEuaW1nID8gMjQ5IDogMzU1O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBvbkNsb3NlKCkge1xyXG4gICAgICAgICAgICBjbGllbnRDb3JlLkRpYWxvZ01nci5pbnMuY2xvc2UodGhpcyk7XHJcbiAgICAgICAgICAgIHRoaXMuY2xvc2VIYW5kbGVyICYmIHRoaXMuY2xvc2VIYW5kbGVyLnJ1bigpO1xyXG4gICAgICAgICAgICB0aGlzLmNsb3NlSGFuZGxlciA9IG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBhZGRFdmVudExpc3RlbmVycygpIHtcclxuICAgICAgICAgICAgQkMuYWRkRXZlbnQodGhpcywgdGhpcy5idG5TdXJlLCBMYXlhLkV2ZW50LkNMSUNLLCB0aGlzLCB0aGlzLm9uQ2xvc2UpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmVtb3ZlRXZlbnRMaXN0ZW5lcnMoKSB7XHJcbiAgICAgICAgICAgIEJDLnJlbW92ZUV2ZW50KHRoaXMpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsIm5hbWVzcGFjZSBsb2dpbjIucGFuZWwge1xyXG4gICAgZXhwb3J0IGNsYXNzIFByaXZhY3lQYW5lbCBleHRlbmRzIHVpLmxvZ2luMi5wYW5lbC5Qcml2YWN5UGFuZWxVSSB7XHJcbiAgICAgICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgICAgIGxldCB0eHQgPSByZXMuZ2V0KCdyZXMvanNvbi9wcml2YWN5LnR4dCcpIGFzIHN0cmluZztcclxuICAgICAgICAgICAgdGhpcy50eHQudGV4dCA9IHR4dFxyXG4gICAgICAgICAgICB0aGlzLnBhbmVsLnZTY3JvbGxCYXJTa2luID0gbnVsbDtcclxuICAgICAgICAgICAgdGhpcy5pbWdHb3UudmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVZpZXcoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgY2hhbmdlKCkge1xyXG4gICAgICAgICAgICBsZXQgc2Nyb2xsQmFyID0gdGhpcy5wYW5lbC52U2Nyb2xsQmFyO1xyXG4gICAgICAgICAgICB0aGlzLmltZ0Jhci55ID0gKHRoaXMuaW1nQmFnQmcuaGVpZ2h0IC0gdGhpcy5pbWdCYXIuaGVpZ2h0KSAqIChzY3JvbGxCYXIudmFsdWUgLyBzY3JvbGxCYXIubWF4KSArIHRoaXMuaW1nQmFnQmcueTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgdXBkYXRlVmlldygpIHtcclxuICAgICAgICAgICAgdGhpcy5idG5TdXJlLmRpc2FibGVkID0gIXRoaXMuaW1nR291LnZpc2libGU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIG9uU2VsZWN0KCkge1xyXG4gICAgICAgICAgICB0aGlzLmltZ0dvdS52aXNpYmxlID0gIXRoaXMuaW1nR291LnZpc2libGU7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlVmlldygpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgYWRkRXZlbnRMaXN0ZW5lcnMoKSB7XHJcbiAgICAgICAgICAgIEJDLmFkZEV2ZW50KHRoaXMsIHRoaXMuYm94U2VsZWN0LCBMYXlhLkV2ZW50LkNMSUNLLCB0aGlzLCB0aGlzLm9uU2VsZWN0KTtcclxuICAgICAgICAgICAgQkMuYWRkRXZlbnQodGhpcywgdGhpcy5idG5TdXJlLCBMYXlhLkV2ZW50LkNMSUNLLCB0aGlzLCB0aGlzLm9uQ2xvc2VQYW5lbCk7XHJcbiAgICAgICAgICAgIEJDLmFkZEV2ZW50KHRoaXMsIHRoaXMucGFuZWwudlNjcm9sbEJhciwgTGF5YS5FdmVudC5DSEFOR0UsIHRoaXMsIHRoaXMuY2hhbmdlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJlbW92ZUV2ZW50TGlzdGVuZXJzKCkge1xyXG4gICAgICAgICAgICBCQy5yZW1vdmVFdmVudCh0aGlzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG9uQ2xvc2VQYW5lbCgpIHtcclxuICAgICAgICAgICAgTGF5YS5Mb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnSEFWRV9TSE9XX1BSSVZBQ0FZJywgJ3RydWUnKTtcclxuICAgICAgICAgICAgY2xpZW50Q29yZS5EaWFsb2dNZ3IuaW5zLmNsb3NlKHRoaXMpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsIm5hbWVzcGFjZSBsb2dpbjIucGFuZWwge1xyXG4gICAgZW51bSBUQUIge1xyXG4gICAgICAgIFBIT05FLFxyXG4gICAgICAgIE5PUk1BTFxyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDms6jlhoxcclxuICAgICAqL1xyXG4gICAgZXhwb3J0IGNsYXNzIFJlZ1BhbmVsIGV4dGVuZHMgdWkubG9naW4yLnBhbmVsLlJlZ1BhbmVsVUkge1xyXG4gICAgICAgIHByaXZhdGUgX3RhYjogVEFCID0gVEFCLlBIT05FO1xyXG4gICAgICAgIHByaXZhdGUgX3Bob25lUmVnOiBQaG9uZVJlZ0NvbnRyb2w7XHJcbiAgICAgICAgcHJpdmF0ZSBfbm9ybWFsUmVnOiBOb3JtYWxSZWdDb250cm9sO1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgICAgICB0aGlzLl9waG9uZVJlZyA9IG5ldyBQaG9uZVJlZ0NvbnRyb2wodGhpcy5yZWdfcGhvbmUpO1xyXG4gICAgICAgICAgICB0aGlzLl9ub3JtYWxSZWcgPSBuZXcgTm9ybWFsUmVnQ29udHJvbCh0aGlzLnJlZ19ub3JtYWwpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwdWJsaWMgc2hvdygpOiB2b2lkIHtcclxuICAgICAgICAgICAgY2xpZW50Q29yZS5EaWFsb2dNZ3IuaW5zLm9wZW4odGhpcyk7XHJcbiAgICAgICAgICAgIHRoaXMuc2hvd1RhYigpO1xyXG4gICAgICAgICAgICB0aGlzLmNoYW5nZUFncmVlbWVudCgpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgYWRkRXZlbnRMaXN0ZW5lcnMoKSB7XHJcbiAgICAgICAgICAgIEJDLmFkZEV2ZW50KHRoaXMsIHRoaXMuYnRuQ2xvc2UsIExheWEuRXZlbnQuQ0xJQ0ssIHRoaXMsIHRoaXMuaGlkZSk7XHJcbiAgICAgICAgICAgIEJDLmFkZEV2ZW50KHRoaXMsIHRoaXMuYnRuUmVnLCBMYXlhLkV2ZW50LkNMSUNLLCB0aGlzLCB0aGlzLm9uQXBwbHkpO1xyXG4gICAgICAgICAgICBCQy5hZGRFdmVudCh0aGlzLCB0aGlzLmltZ0JveCwgTGF5YS5FdmVudC5DTElDSywgdGhpcywgdGhpcy5jaGFuZ2VBZ3JlZW1lbnQpO1xyXG4gICAgICAgICAgICBCQy5hZGRFdmVudCh0aGlzLCB0aGlzLnR4dENsYXVzZSwgTGF5YS5FdmVudC5DTElDSywgdGhpcywgdGhpcy5vbkFncmVlbWVudCk7XHJcbiAgICAgICAgICAgIEJDLmFkZEV2ZW50KHRoaXMsIHRoaXMudGFiX2FjY291bnQsIExheWEuRXZlbnQuQ0xJQ0ssIHRoaXMsIHRoaXMub25UYWJDaGFuZ2UsIFtUQUIuTk9STUFMXSk7XHJcbiAgICAgICAgICAgIEJDLmFkZEV2ZW50KHRoaXMsIHRoaXMudGFiX3Bob25lLCBMYXlhLkV2ZW50LkNMSUNLLCB0aGlzLCB0aGlzLm9uVGFiQ2hhbmdlLCBbVEFCLlBIT05FXSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgcmVtb3ZlRXZlbnRMaXN0ZW5lcnMoKSB7XHJcbiAgICAgICAgICAgIEJDLnJlbW92ZUV2ZW50KHRoaXMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGhpZGUoKSB7XHJcbiAgICAgICAgICAgIGNsaWVudENvcmUuRGlhbG9nTWdyLmlucy5jbG9zZSh0aGlzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgY2hhbmdlQWdyZWVtZW50KCkge1xyXG4gICAgICAgICAgICB0aGlzLmltZ0dvdS52aXNpYmxlID0gIXRoaXMuaW1nR291LnZpc2libGU7XHJcbiAgICAgICAgICAgIHRoaXMuYnRuUmVnLmRpc2FibGVkID0gIXRoaXMuaW1nR291LnZpc2libGU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIG9uQWdyZWVtZW50KCkge1xyXG4gICAgICAgICAgICBpZiAoTGF5YS5SZW5kZXIuaXNDb25jaEFwcCkge1xyXG4gICAgICAgICAgICAgICAgY2xpZW50Q29yZS5OYXRpdmVNZ3IuaW5zdGFuY2Uub3BlblVybCgnaHR0cDovL3d3dy42MS5jb20vYWJvdXQvc2VydmljZS5odG1sJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB3aW5kb3cub3BlbignaHR0cDovL3d3dy42MS5jb20vYWJvdXQvc2VydmljZS5odG1sJywgJ19ibGFuaycpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIG9uVGFiQ2hhbmdlKHRhYjogVEFCKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl90YWIgIT0gdGFiKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl90YWIgPSB0YWI7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dUYWIoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzaG93VGFiKCkge1xyXG4gICAgICAgICAgICB0aGlzLnJlZ19waG9uZS52aXNpYmxlID0gdGhpcy5fdGFiID09IFRBQi5QSE9ORTtcclxuICAgICAgICAgICAgdGhpcy5yZWdfbm9ybWFsLnZpc2libGUgPSB0aGlzLl90YWIgPT0gVEFCLk5PUk1BTDtcclxuICAgICAgICAgICAgKHRoaXMudGFiX3Bob25lLmdldENoaWxkQXQoMCkgYXMgTGF5YS5DbGlwKS5pbmRleCA9IHRoaXMuX3RhYiA9PSBUQUIuUEhPTkUgPyAxIDogMDtcclxuICAgICAgICAgICAgKHRoaXMudGFiX2FjY291bnQuZ2V0Q2hpbGRBdCgwKSBhcyBMYXlhLkNsaXApLmluZGV4ID0gdGhpcy5fdGFiID09IFRBQi5OT1JNQUwgPyAxIDogMDtcclxuICAgICAgICAgICAgKHRoaXMudGFiX3Bob25lLmdldENoaWxkQXQoMSkgYXMgTGF5YS5JbWFnZSkueSA9IHRoaXMuX3RhYiA9PSBUQUIuUEhPTkUgPyAyMyA6IDMzO1xyXG4gICAgICAgICAgICAodGhpcy50YWJfYWNjb3VudC5nZXRDaGlsZEF0KDEpIGFzIExheWEuSW1hZ2UpLnkgPSB0aGlzLl90YWIgPT0gVEFCLk5PUk1BTCA/IDIzIDogMzM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgb25BcHBseSgpIHtcclxuICAgICAgICAgICAgc3dpdGNoICh0aGlzLl90YWIpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgVEFCLlBIT05FOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3Bob25lUmVnPy5zdGFydFJlZygpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBUQUIuTk9STUFMOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX25vcm1hbFJlZz8uc3RhcnRSZWcoKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJuYW1lc3BhY2UgbG9naW4yLnBhbmVsIHtcclxuICAgIC8qKlxyXG4gICAgICog6aqM6K+B56CBXHJcbiAgICAgKi9cclxuICAgIGV4cG9ydCBjbGFzcyBTZXJpYWxQYW5lbCBleHRlbmRzIHVpLmxvZ2luMi5wYW5lbC5TZXJpYWxVSSB7XHJcblxyXG4gICAgICAgIHByaXZhdGUgX3N1YzogRnVuY3Rpb247IC8v6aqM6K+B5oiQ5YqfXHJcblxyXG4gICAgICAgIHB1YmxpYyBzaWRlQ2xvc2UgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgY29uc3RydWN0b3IoKSB7IHN1cGVyKCk7IH1cclxuXHJcbiAgICAgICAgcHVibGljIHNob3coc3VjKTogdm9pZCB7XHJcbiAgICAgICAgICAgIGNsaWVudENvcmUuRGlhbG9nTWdyLmlucy5vcGVuKHRoaXMpO1xyXG4gICAgICAgICAgICB0aGlzLl9zdWMgPSBzdWM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgYWRkRXZlbnRMaXN0ZW5lcnMoKTogdm9pZCB7XHJcbiAgICAgICAgICAgIEJDLmFkZEV2ZW50KHRoaXMsIHRoaXMuYnRuQ2xvc2UsIExheWEuRXZlbnQuQ0xJQ0ssIHRoaXMsIHRoaXMuaGlkZSk7XHJcbiAgICAgICAgICAgIEJDLmFkZEV2ZW50KHRoaXMsIHRoaXMuYnRuU3VyZSwgTGF5YS5FdmVudC5DTElDSywgdGhpcywgdGhpcy5vblN1cmUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHJlbW92ZUV2ZW50TGlzdGVuZXJzKCk6IHZvaWQge1xyXG4gICAgICAgICAgICBCQy5yZW1vdmVFdmVudCh0aGlzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBoaWRlKCk6IHZvaWQge1xyXG4gICAgICAgICAgICBjbGllbnRDb3JlLkRpYWxvZ01nci5pbnMuY2xvc2UodGhpcyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgZGVzdHJveSgpOiB2b2lkIHtcclxuICAgICAgICAgICAgc3VwZXIuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICB0aGlzLl9zdWMgPSBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqIOajgOa1i+mqjOivgeeggSovXHJcbiAgICAgICAgcHJpdmF0ZSBvblN1cmUoKTogdm9pZCB7XHJcbiAgICAgICAgICAgIG5ldC5zZW5kQW5kV2FpdChuZXcgcGIuY3NfdXNlcl91c2VfaW52aXRhdGlvbl9jb2RlKHsgY29kZTogdGhpcy5pbnB1dC50ZXh0IH0pKS50aGVuKChtc2c6IHBiLnNjX3VzZXJfdXNlX2ludml0YXRpb25fY29kZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fc3VjKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmhpZGUoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwibmFtZXNwYWNlIGxvZ2luMi5wYW5lbCB7XHJcbiAgICAvKipcclxuICAgICAqIOacjeWKoeWZqOWIl+ihqFxyXG4gICAgICovXHJcbiAgICBleHBvcnQgY2xhc3MgU2VydmVyUGFuZWwgZXh0ZW5kcyB1aS5sb2dpbjIucGFuZWwuU2VydmVyUGFuZWxVSSB7XHJcblxyXG5cclxuICAgICAgICBwcml2YXRlIF94bHNEYXRhOiB1dGlsLkhhc2hNYXA8eGxzLnNlcnZlck5hbWU+O1xyXG4gICAgICAgIHByaXZhdGUgX2N1clNydjogcGIuSW9ubGluZUluZm87XHJcbiAgICAgICAgcHJpdmF0ZSBfYWxsU3J2OiBwYi5Jb25saW5lSW5mb1tdO1xyXG4gICAgICAgIHByaXZhdGUgX2xhc3RJZDogbnVtYmVyO1xyXG5cclxuICAgICAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICAgICAgdGhpcy5yZUxpc3QucmVuZGVySGFuZGxlciA9IExheWEuSGFuZGxlci5jcmVhdGUodGhpcywgdGhpcy5yZWNvbW1hbmRSZW5kZXIsIG51bGwsIGZhbHNlKTtcclxuICAgICAgICAgICAgdGhpcy5yZUxpc3Quc2VsZWN0SGFuZGxlciA9IExheWEuSGFuZGxlci5jcmVhdGUodGhpcywgdGhpcy5yZWNvbW1hbmRTZWxlY3QsIG51bGwsIGZhbHNlKTtcclxuICAgICAgICAgICAgdGhpcy5zZXJ2ZXJMaXN0LnZTY3JvbGxCYXJTa2luID0gXCJcIjtcclxuICAgICAgICAgICAgdGhpcy5zZXJ2ZXJMaXN0LnJlbmRlckhhbmRsZXIgPSBMYXlhLkhhbmRsZXIuY3JlYXRlKHRoaXMsIHRoaXMuc2VydmVyUmVuZGVyLCBudWxsLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIHRoaXMuc2VydmVyTGlzdC5zZWxlY3RIYW5kbGVyID0gTGF5YS5IYW5kbGVyLmNyZWF0ZSh0aGlzLCB0aGlzLnNlcnZlclNlbGVjdCwgbnVsbCwgZmFsc2UpO1xyXG4gICAgICAgICAgICB0aGlzLnNlcnZlckxpc3Quc2Nyb2xsQmFyLmVsYXN0aWNCYWNrVGltZSA9IDIwMDtcclxuICAgICAgICAgICAgdGhpcy5zZXJ2ZXJMaXN0LnNjcm9sbEJhci5lbGFzdGljRGlzdGFuY2UgPSAyMDA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc2hvdyhhcnJheTogcGIuSW9ubGluZUluZm9bXSk6IHZvaWQge1xyXG4gICAgICAgICAgICBjbGllbnRDb3JlLkRpYWxvZ01nci5pbnMub3Blbih0aGlzKTtcclxuICAgICAgICAgICAgdGhpcy5feGxzRGF0YSA9IHhscy5nZXQoeGxzLnNlcnZlck5hbWUpO1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVZpZXcoYXJyYXkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBvbklucHV0T3ZlcigpIHtcclxuICAgICAgICAgICAgbGV0IHRhcmdldElkID0gdGhpcy50eHRJbnB1dC50ZXh0XHJcbiAgICAgICAgICAgIGxldCBpZHggPSBfLmZpbmRJbmRleCh0aGlzLl9hbGxTcnYsIChvKSA9PiB7IHJldHVybiBvLmlkID09IHBhcnNlSW50KHRhcmdldElkKSB9KTtcclxuICAgICAgICAgICAgaWYgKGlkeCA+IC0xKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlcnZlckxpc3QuZGF0YVNvdXJjZSA9IFt0aGlzLl9hbGxTcnZbaWR4XV07XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdFJlbmRlcih0aGlzLl9hbGxTcnZbaWR4XSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlcnZlckxpc3QuYXJyYXkgPSB0aGlzLl9hbGxTcnY7XHJcbiAgICAgICAgICAgICAgICBsZXQgcmFuID0gXy5yYW5kb20oMCwgdGhpcy5fYWxsU3J2Lmxlbmd0aCAtIDEsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0UmVuZGVyKHRoaXMuX2FsbFNydltyYW5dKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGFkZEV2ZW50TGlzdGVuZXJzKCk6IHZvaWQge1xyXG4gICAgICAgICAgICBCQy5hZGRFdmVudCh0aGlzLCB0aGlzLmJ0bkNsb3NlLCBMYXlhLkV2ZW50LkNMSUNLLCB0aGlzLCB0aGlzLmhpZGUpO1xyXG4gICAgICAgICAgICBCQy5hZGRFdmVudCh0aGlzLCB0aGlzLmJ0blN1cmUsIExheWEuRXZlbnQuQ0xJQ0ssIHRoaXMsIHRoaXMub25TdXJlKTtcclxuICAgICAgICAgICAgQkMuYWRkRXZlbnQodGhpcywgdGhpcy50eHRJbnB1dCwgTGF5YS5FdmVudC5JTlBVVCwgdGhpcywgdGhpcy5vbklucHV0T3Zlcik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgcmVtb3ZlRXZlbnRMaXN0ZW5lcnMoKTogdm9pZCB7XHJcbiAgICAgICAgICAgIEJDLnJlbW92ZUV2ZW50KHRoaXMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGRlc3Ryb3koKTogdm9pZCB7XHJcbiAgICAgICAgICAgIHRoaXMuX2N1clNydiA9IHRoaXMuX3hsc0RhdGEgPSBudWxsO1xyXG4gICAgICAgICAgICBzdXBlci5kZXN0cm95KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGhpZGUoKTogdm9pZCB7XHJcbiAgICAgICAgICAgIGNsaWVudENvcmUuRGlhbG9nTWdyLmlucy5jbG9zZSh0aGlzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgb25TdXJlKCk6IHZvaWQge1xyXG4gICAgICAgICAgICBFdmVudE1hbmFnZXIuZXZlbnQoZ2xvYmFsRXZlbnQuU0VMRUNUX09ORV9TRVJWRVIsIHRoaXMuX2N1clNydik7XHJcbiAgICAgICAgICAgIHRoaXMuaGlkZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gc3RhdHVzIDEtNCDnqbrpl7Ig5o6o6I2QIOeBq+eDrSDniIbmu6FcclxuICAgICAgICBwcml2YXRlIHVwZGF0ZVZpZXcoYXJyYXk6IHBiLklvbmxpbmVJbmZvW10pOiB2b2lkIHtcclxuICAgICAgICAgICAgbGV0IHJlQXJyOiBBcnJheTxwYi5Jb25saW5lSW5mb1tdPiA9IFtbXSwgW10sIFtdLCBbXV07IC8v5o6o6I2QXHJcbiAgICAgICAgICAgIF8uZm9yRWFjaChhcnJheSwgKGVsZW1lbnQ6IHBiLklvbmxpbmVJbmZvKSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZUFycltlbGVtZW50LnN0YXR1cyAtIDFdLnB1c2goZWxlbWVudCk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcmVBcnIubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIHJlQXJyW2ldID0gXy5zaHVmZmxlKHJlQXJyW2ldKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLl9hbGxTcnYgPSBfLmZsYXR0ZW4ocmVBcnIpO1xyXG4gICAgICAgICAgICB0aGlzLl9sYXN0SWQgPSBwYXJzZUludCh3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2hpc3Rvcnlfc2VydmVyX2lkJykpO1xyXG4gICAgICAgICAgICB0aGlzLnNlcnZlckxpc3QuYXJyYXkgPSB0aGlzLl9hbGxTcnY7XHJcbiAgICAgICAgICAgIHRoaXMucmVMaXN0LmFycmF5ID0gXy5jb25jYXQoXy5maWx0ZXIodGhpcy5fYWxsU3J2LCAoZWxlbWVudCkgPT4geyByZXR1cm4gZWxlbWVudC5pZCA9PSB0aGlzLl9sYXN0SWQ7IH0pLCBfLmZpbHRlcih0aGlzLl9hbGxTcnYsIChlbGVtZW50KSA9PiB7IHJldHVybiBlbGVtZW50LmlkICE9IHRoaXMuX2xhc3RJZDsgfSkpO1xyXG4gICAgICAgICAgICB0aGlzLnNlcnZlckxpc3Quc2VsZWN0ZWRJbmRleCA9IF8ucmFuZG9tKDAsIGFycmF5Lmxlbmd0aCAtIDEsIGZhbHNlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKiDlvZPliY3pgInmi6nmuLLmn5MqL1xyXG4gICAgICAgIHByaXZhdGUgc2VsZWN0UmVuZGVyKGluZm86IHBiLklvbmxpbmVJbmZvKTogdm9pZCB7XHJcbiAgICAgICAgICAgIHRoaXMuY3VyU2VydmVyLmltZ0JHLnNraW4gPSBcInNlbGVjdFNlcnZlci9yZWN0Mi5wbmdcIjtcclxuICAgICAgICAgICAgdGhpcy5pdGVtUmVuZGVyKHRoaXMuY3VyU2VydmVyLCBpbmZvLCB0cnVlKTtcclxuICAgICAgICAgICAgdGhpcy5fY3VyU3J2ID0gaW5mbztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKiDmjqjojZDmnI3liqHlmajmuLLmn5MgKi9cclxuICAgICAgICBwcml2YXRlIHJlY29tbWFuZFJlbmRlcihpdGVtOiB1aS5sb2dpbjIuaXRlbS5TZXJ2ZXJJdGVtVUksIGluZGV4OiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICAgICAgbGV0IGluZm86IHBiLklvbmxpbmVJbmZvID0gaXRlbS5kYXRhU291cmNlO1xyXG4gICAgICAgICAgICBpdGVtLmltZ0JHLnNraW4gPSBcInNlbGVjdFNlcnZlci9yZWN0My5wbmdcIjtcclxuICAgICAgICAgICAgdGhpcy5pdGVtUmVuZGVyKGl0ZW0sIGluZm8pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSByZWNvbW1hbmRTZWxlY3QoaW5kZXg6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgICAgICBpZiAoaW5kZXggPT0gLTEpIHJldHVybjtcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3RSZW5kZXIodGhpcy5yZUxpc3QuYXJyYXlbaW5kZXhdKTtcclxuICAgICAgICAgICAgdGhpcy5zZXJ2ZXJMaXN0LnNlbGVjdGVkSW5kZXggPSAtMTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKiDlhajpg6jmnI3liqHlmajmuLLmn5MqL1xyXG4gICAgICAgIHByaXZhdGUgc2VydmVyUmVuZGVyKGl0ZW06IHVpLmxvZ2luMi5pdGVtLlNlcnZlckl0ZW1VSSwgaW5kZXg6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgICAgICBsZXQgaW5mbzogcGIuSW9ubGluZUluZm8gPSBpdGVtLmRhdGFTb3VyY2U7XHJcbiAgICAgICAgICAgIGl0ZW0uaW1nQkcuc2tpbiA9IGluZGV4ID09IHRoaXMuc2VydmVyTGlzdC5zZWxlY3RlZEluZGV4ID8gXCJzZWxlY3RTZXJ2ZXIvcmVjdDQucG5nXCIgOiBcInNlbGVjdFNlcnZlci9yZWN0MS5wbmdcIjtcclxuICAgICAgICAgICAgdGhpcy5pdGVtUmVuZGVyKGl0ZW0sIGluZm8pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzZXJ2ZXJTZWxlY3QoaW5kZXg6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgICAgICBpZiAoaW5kZXggPT0gLTEpIHJldHVybjtcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3RSZW5kZXIodGhpcy5zZXJ2ZXJMaXN0LmFycmF5W2luZGV4XSk7XHJcbiAgICAgICAgICAgIHRoaXMucmVMaXN0LnNlbGVjdGVkSW5kZXggPSAtMTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgaXRlbVJlbmRlcihpdGVtOiB1aS5sb2dpbjIuaXRlbS5TZXJ2ZXJJdGVtVUksIGluZm86IHBiLklvbmxpbmVJbmZvLCBpc0N1cj86IGJvb2xlYW4pOiB2b2lkIHtcclxuICAgICAgICAgICAgaWYgKCFpdGVtIHx8ICFpbmZvKSByZXR1cm47XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5feGxzRGF0YSkgcmV0dXJuO1xyXG4gICAgICAgICAgICBpdGVtLnR4SUQuY2hhbmdlVGV4dChpbmZvLmlkICsgXCJcIik7XHJcbiAgICAgICAgICAgIGxldCBuYW1lID0gdGhpcy5feGxzRGF0YS5oYXMoaW5mby5pZCAlIDEwMDAwKSA/IHRoaXMuX3hsc0RhdGEuZ2V0KGluZm8uaWQgJSAxMDAwMCkuc2VydmVyTmFtZSA6IHRoaXMuX3hsc0RhdGEuZ2V0KGluZm8uaWQgJSA2MDApPy5zZXJ2ZXJOYW1lO1xyXG4gICAgICAgICAgICBpdGVtLnR4TmFtZS50ZXh0ID0gbmFtZSA/IG5hbWUgOiAnICc7XHJcbiAgICAgICAgICAgIGxldCBpc0Jvb206IGJvb2xlYW4gPSBpbmZvLnN0YXR1cyA9PSA0O1xyXG4gICAgICAgICAgICBpdGVtLmltZ0JtLnZpc2libGUgPSBpc0Jvb207XHJcbiAgICAgICAgICAgIGl0ZW0uaW1nQ2lyLnNraW4gPSBpc0Jvb20gPyBcInNlbGVjdFNlcnZlci95dWFuX25ldy5wbmdcIiA6IFwic2VsZWN0U2VydmVyL3l1YW5fbmV3XyEucG5nXCI7XHJcbiAgICAgICAgICAgIGl0ZW0uaW1nSGlzdG9yeS52aXNpYmxlID0gIWlzQ3VyICYmIHRoaXMuX2xhc3RJZCA9PSBpbmZvLmlkO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsIm5hbWVzcGFjZSBsb2dpbjIge1xyXG4gICAgLy/mlofmoaPlnLDlnYAgaHR0cDovLzEwLjEuMS4xMDQvc2hvd2RvYy9pbmRleC5waHA/cz0vMiZwYWdlX2lkPTEzXHJcblxyXG4gICAgY29uc3QgUkVHX05PUk1BTF9VUkwgPSAnaHR0cDovL2FjY291bnQtY28uNjEuY29tL2dhbWVSZWdpc3Rlci9yZWdpc3RlckN1c3RvbSc7XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIE5vcm1hbFJlZ0NvbnRyb2wgaW1wbGVtZW50cyBJUmVnQ29udHJvbCB7XHJcbiAgICAgICAgcHJpdmF0ZSB1aTogdWkubG9naW4yLnBhbmVsLlJlZ19ub3JtYWxVSTtcclxuICAgICAgICBwcml2YXRlIF9sYWJlbEFycjogTGF5YS5UZXh0SW5wdXRbXTtcclxuXHJcbiAgICAgICAgY29uc3RydWN0b3IodjogdWkubG9naW4yLnBhbmVsLlJlZ19ub3JtYWxVSSkge1xyXG4gICAgICAgICAgICB0aGlzLnVpID0gdjtcclxuICAgICAgICAgICAgdGhpcy51aS52aXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuX2xhYmVsQXJyID0gW3RoaXMudWkudHh0QWNjb3VudCwgdGhpcy51aS50eHRQd18wLCB0aGlzLnVpLnR4dFB3XzEsIHRoaXMudWkudHh0VmVyaWZ5XTtcclxuICAgICAgICAgICAgQkMuYWRkRXZlbnQodGhpcywgdGhpcy51aS5idG5HZXQsIExheWEuRXZlbnQuQ0xJQ0ssIHRoaXMsIHRoaXMub25SZXFWZXJpZnlDb2RlKTtcclxuICAgICAgICAgICAgdGhpcy5vblJlcVZlcmlmeUNvZGUoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHN0YXJ0UmVnKCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy52YWxpZGF0ZUlucHV0KCkpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnVpLnR4dFZlcmlmeS50ZXh0Lmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgaHR0cDogTGF5YS5IdHRwUmVxdWVzdCA9IG5ldyBMYXlhLkh0dHBSZXF1ZXN0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaHR0cC5vbmNlKExheWEuRXZlbnQuQ09NUExFVEUsIHRoaXMsIChkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhICYmIGRhdGEucmVzdWx0ID09IDApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBFdmVudE1hbmFnZXIuZXZlbnQoZ2xvYmFsRXZlbnQuU0lHSUlOX1NVQ0NFU1MsIFt0aGlzLnVpLnR4dEFjY291bnQudGV4dCwgdGhpcy51aS50eHRQd18wLnRleHRdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEgJiYgZGF0YS5lcnJfZGVzYykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vblJlcVZlcmlmeUNvZGUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFsZXJ0LnNob3dGV29yZHMoZGF0YS5lcnJfZGVzYyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICBodHRwLmh0dHAud2l0aENyZWRlbnRpYWxzID0gdHJ1ZTsgLy/ot6jln5/kvKDlhaVDb29raWVcclxuICAgICAgICAgICAgICAgICAgICBsZXQgcGFyYW1BcnIgPSBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGBhY2NvdW50PSR7dGhpcy51aS50eHRBY2NvdW50LnRleHR9YCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgYHBhc3N3ZD0ke3RoaXMudWkudHh0UHdfMC50ZXh0fWAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGBzZWNfcGFzc3dkPSR7dGhpcy51aS50eHRQd18xLnRleHR9YCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgYHJldF90eXBlPSR7Mn1gLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBgZ2FtZT0kezY5NX1gLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBgdGFkPSR7J3Vua25vd24nfWAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGB2ZXJpY29kZT0ke3RoaXMudWkudHh0VmVyaWZ5LnRleHR9YCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgYHJlYWxfbmFtZT0keyfljJfkuqzkuronfWAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGBpZGVudGlmaWNhdGlvbj0keycxMTAxMDExOTkwMDMwNzY3MzknfWBcclxuICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICAgICAgaHR0cC5zZW5kKFJFR19OT1JNQUxfVVJMLCBwYXJhbUFyci5qb2luKCcmJyksIFwicG9zdFwiLCBcImpzb25cIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgdmVyaWNvZGVVcmw6IHN0cmluZztcclxuICAgICAgICAvKipcclxuICAgICAgICAqIOivt+axguWbvueJh+mqjOivgeeggVxyXG4gICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBvblJlcVZlcmlmeUNvZGUoKSB7XHJcbiAgICAgICAgICAgIHRoaXMudmVyaWNvZGVVcmwgJiYgTGF5YS5sb2FkZXIuY2xlYXJSZXModGhpcy52ZXJpY29kZVVybCk7IC8v5riF55CG57yT5a2YXHJcbiAgICAgICAgICAgIGlmICghTGF5YS5SZW5kZXIuaXNDb25jaEFwcCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy52ZXJpY29kZVVybCA9IFwiaHR0cDovL2FjY291bnQtY28uNjEuY29tL3Zlcmljb2RlL2dlbmVyYXRlP2dhbWU9Njk1JnM9XCIgKyBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMDAwMDAwKTtcclxuICAgICAgICAgICAgICAgIGxldCBodHRwOiBMYXlhLkh0dHBSZXF1ZXN0ID0gbmV3IExheWEuSHR0cFJlcXVlc3QoKTtcclxuICAgICAgICAgICAgICAgIGh0dHAub25jZShMYXlhLkV2ZW50LkNPTVBMRVRFLCB0aGlzLCAoZGF0YTogYW55KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51aS5pbWdWZXJpZnkuc2tpbiA9IGBkYXRhOmltYWdlL3BuZztiYXNlNjQsJHt0aGlzLmFycmF5QnVmZmVyVG9CYXNlNjQoZGF0YSl9YDtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgaHR0cC5odHRwLndpdGhDcmVkZW50aWFscyA9IHRydWU7IC8v6Leo5Z+f5Lyg5YWlQ29va2llXHJcbiAgICAgICAgICAgICAgICBodHRwLnNlbmQodGhpcy52ZXJpY29kZVVybCwgXCJcIiwgXCJnZXRcIiwgXCJhcnJheWJ1ZmZlclwiKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudWkuaW1nVmVyaWZ5LnNraW4gPSBcImh0dHA6Ly9hY2NvdW50LWNvLjYxLmNvbS92ZXJpY29kZS9nZW5lcmF0ZT9nYW1lPTY5NSZzPVwiICsgTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTAwMDAwMCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgYXJyYXlCdWZmZXJUb0Jhc2U2NChidWZmZXIpIHtcclxuICAgICAgICAgICAgbGV0IGJpbmFyeSA9ICcnO1xyXG4gICAgICAgICAgICBjb25zdCBieXRlcyA9IG5ldyBVaW50OEFycmF5KGJ1ZmZlcik7XHJcbiAgICAgICAgICAgIGNvbnN0IGxlbiA9IGJ5dGVzLmJ5dGVMZW5ndGg7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuOyBpICs9IDEpIHtcclxuICAgICAgICAgICAgICAgIGJpbmFyeSArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGJ5dGVzW2ldKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gTGF5YS5Ccm93c2VyLndpbmRvdy5idG9hKGJpbmFyeSk7ICAvL2Jhc2U2NFxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHByaXZhdGUgdmFsaWRhdGVJbnB1dCgpIHtcclxuICAgICAgICAgICAgbGV0IHJlZ0FjY291bnQgPSAvXlthLXpBLVowLTlfLV17NiwyMH0kLztcclxuICAgICAgICAgICAgbGV0IHJlZ1B3ID0gL15bYS16QS1aMC05XXs2LDE2fSQvO1xyXG5cclxuICAgICAgICAgICAgaWYgKHJlZ0FjY291bnQudGVzdCh0aGlzLnVpLnR4dEFjY291bnQudGV4dCkpXHJcbiAgICAgICAgICAgICAgICBpZiAocmVnUHcudGVzdCh0aGlzLnVpLnR4dFB3XzAudGV4dCkpXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMudWkudHh0UHdfMC50ZXh0ID09IHRoaXMudWkudHh0UHdfMS50ZXh0KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFsZXJ0LnNob3dGV29yZHMoJ+S4pOasoei+k+WFpeWvhueggeS4jeebuOWQjCcpO1xyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIGFsZXJ0LnNob3dGV29yZHMoJ+WvhueggeS4jeespuWQiOimgeaxgicpO1xyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICBhbGVydC5zaG93RldvcmRzKCfotKblj7fmoLzlvI/kuI3mraPnoa4nKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGRlc3RvcnkoKSB7XHJcbiAgICAgICAgICAgIEJDLnJlbW92ZUV2ZW50KHRoaXMpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsIm5hbWVzcGFjZSBsb2dpbjIge1xyXG4gICAgLy/mlofmoaPlnLDlnYAgaHR0cDovLzEwLjEuMS4xMDQvc2hvd2RvYy9pbmRleC5waHA/cz0vMiZwYWdlX2lkPTIzXHJcbiAgICBjb25zdCBSRUdfUEhPTkVfVVJMID0gJ2h0dHA6Ly9hY2NvdW50LWNvLjYxLmNvbS9nYW1lUmVnaXN0ZXIvcmVnaXN0ZXJQaG9uZSc7XHJcbiAgICBjb25zdCBWRVJJRllfUEhPTkVfVVJMID0gJ2h0dHA6Ly9hY2NvdW50LWNvLjYxLmNvbS9nYW1lUmVnaXN0ZXIvdmVyaWZ5UGhvbmUnO1xyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBQaG9uZVJlZ0NvbnRyb2wgaW1wbGVtZW50cyBJUmVnQ29udHJvbCB7XHJcbiAgICAgICAgcHJpdmF0ZSB1aTogdWkubG9naW4yLnBhbmVsLlJlZ19waG9uZVVJO1xyXG4gICAgICAgIHByaXZhdGUgX2xhYmVsQXJyOiBMYXlhLlRleHRJbnB1dFtdO1xyXG5cclxuICAgICAgICBjb25zdHJ1Y3Rvcih2OiB1aS5sb2dpbjIucGFuZWwuUmVnX3Bob25lVUkpIHtcclxuICAgICAgICAgICAgdGhpcy51aSA9IHY7XHJcbiAgICAgICAgICAgIHRoaXMudWkudmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLl9sYWJlbEFyciA9IFt0aGlzLnVpLnR4dFBob25lLCB0aGlzLnVpLnR4dFB3XzAsIHRoaXMudWkudHh0UHdfMSwgdGhpcy51aS50eHRWZXJpZnldO1xyXG4gICAgICAgICAgICBCQy5hZGRFdmVudCh0aGlzLCB0aGlzLnVpLmJ0bkdldCwgTGF5YS5FdmVudC5DTElDSywgdGhpcywgdGhpcy5vblJlcVZlcmlmeUNvZGUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc3RhcnRSZWcoKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnZhbGlkYXRlSW5wdXQoKSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudWkudHh0VmVyaWZ5LnRleHQubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBodHRwOiBMYXlhLkh0dHBSZXF1ZXN0ID0gbmV3IExheWEuSHR0cFJlcXVlc3QoKTtcclxuICAgICAgICAgICAgICAgICAgICBodHRwLm9uY2UoTGF5YS5FdmVudC5DT01QTEVURSwgdGhpcywgKGRhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEgJiYgZGF0YS5yZXN1bHQgPT0gMClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEV2ZW50TWFuYWdlci5ldmVudChnbG9iYWxFdmVudC5TSUdJSU5fU1VDQ0VTUywgW3RoaXMudWkudHh0UGhvbmUudGV4dCwgdGhpcy51aS50eHRQd18wLnRleHRdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEgJiYgZGF0YS5lcnJfZGVzYylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFsZXJ0LnNob3dGV29yZHMoZGF0YS5lcnJfZGVzYyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaHR0cC5odHRwLndpdGhDcmVkZW50aWFscyA9IHRydWU7IC8v6Leo5Z+f5Lyg5YWlQ29va2llXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHBhcmFtQXJyID0gW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBgcGhvbmVfY29kZT0ke3RoaXMudWkudHh0VmVyaWZ5LnRleHR9YCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgJ3JldF90eXBlPTInXHJcbiAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgICAgIGh0dHAuc2VuZChWRVJJRllfUEhPTkVfVVJMLCBwYXJhbUFyci5qb2luKCcmJyksIFwicG9zdFwiLCBcImpzb25cIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICog6K+35rGC55+t5L+h6aqM6K+B56CBXHJcbiAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIG9uUmVxVmVyaWZ5Q29kZSgpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMudmFsaWRhdGVJbnB1dCgpKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgaHR0cDogTGF5YS5IdHRwUmVxdWVzdCA9IG5ldyBMYXlhLkh0dHBSZXF1ZXN0KCk7XHJcbiAgICAgICAgICAgICAgICBodHRwLm9uY2UoTGF5YS5FdmVudC5DT01QTEVURSwgdGhpcywgKGRhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YSAmJiBkYXRhLnJlc3VsdCA9PSAwKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhbGVydC5zaG93RldvcmRzKCfpqozor4HnoIHlt7Llj5HpgIEnKVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXRhICYmIGRhdGEuZXJyX2Rlc2MpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFsZXJ0LnNob3dGV29yZHMoZGF0YS5lcnJfZGVzYyk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIGh0dHAuaHR0cC53aXRoQ3JlZGVudGlhbHMgPSB0cnVlOyAvL+i3qOWfn+S8oOWFpUNvb2tpZVxyXG4gICAgICAgICAgICAgICAgbGV0IHBhcmFtQXJyID0gW1xyXG4gICAgICAgICAgICAgICAgICAgIGBhY2NvdW50PSR7dGhpcy51aS50eHRQaG9uZS50ZXh0fWAsXHJcbiAgICAgICAgICAgICAgICAgICAgYHBhc3N3ZD0ke3RoaXMudWkudHh0UHdfMC50ZXh0fWAsXHJcbiAgICAgICAgICAgICAgICAgICAgYHNlY19wYXNzd2Q9JHt0aGlzLnVpLnR4dFB3XzEudGV4dH1gLFxyXG4gICAgICAgICAgICAgICAgICAgIGByZXRfdHlwZT0kezJ9YCxcclxuICAgICAgICAgICAgICAgICAgICBgZ2FtZT0kezY5NX1gLFxyXG4gICAgICAgICAgICAgICAgICAgIGB0YWQ9JHsndW5rbm93bid9YCxcclxuICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgIGh0dHAuc2VuZChSRUdfUEhPTkVfVVJMLCBwYXJhbUFyci5qb2luKCcmJyksIFwicG9zdFwiLCBcImpzb25cIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgdmFsaWRhdGVJbnB1dCgpIHtcclxuICAgICAgICAgICAgbGV0IHJlZ1Bob25lID0gL14xWzM0NTY3ODldXFxkezl9JC87XHJcbiAgICAgICAgICAgIGxldCByZWdQdyA9IC9eW2EtekEtWjAtOV17NiwxNn0kLztcclxuXHJcbiAgICAgICAgICAgIGlmIChyZWdQaG9uZS50ZXN0KHRoaXMudWkudHh0UGhvbmUudGV4dCkpXHJcbiAgICAgICAgICAgICAgICBpZiAocmVnUHcudGVzdCh0aGlzLnVpLnR4dFB3XzAudGV4dCkpXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMudWkudHh0UHdfMC50ZXh0ID09IHRoaXMudWkudHh0UHdfMS50ZXh0KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFsZXJ0LnNob3dGV29yZHMoJ+S4pOasoei+k+WFpeWvhueggeS4jeebuOWQjCcpO1xyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIGFsZXJ0LnNob3dGV29yZHMoJ+WvhueggeS4jeespuWQiOimgeaxgicpO1xyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICBhbGVydC5zaG93RldvcmRzKCfmiYvmnLrlj7fovpPlhaXkuI3mraPnoa4nKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGRlc3RvcnkoKSB7XHJcbiAgICAgICAgICAgIEJDLnJlbW92ZUV2ZW50KHRoaXMpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsIm5hbWVzcGFjZSBsb2dpbjIge1xyXG4gICAgZXhwb3J0IGludGVyZmFjZSBJUmVnQ29udHJvbCB7XHJcbiAgICAgICAgLyoq54K55Ye75rOo5YaM5ZCO55qE5a6e546wICovXHJcbiAgICAgICAgc3RhcnRSZWcoKTtcclxuICAgICAgICBkZXN0b3J5KCk7XHJcbiAgICB9XHJcbn0iXX0=
