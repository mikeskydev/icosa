/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is not neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/camera-controls/dist/camera-controls.module.js":
/*!*********************************************************************!*\
  !*** ./node_modules/camera-controls/dist/camera-controls.module.js ***!
  \*********************************************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/*!\n * camera-controls\n * https://github.com/yomotsu/camera-controls\n * (c) 2017 @yomotsu\n * Released under the MIT License.\n */\n/*! *****************************************************************************\r\nCopyright (c) Microsoft Corporation.\r\n\r\nPermission to use, copy, modify, and/or distribute this software for any\r\npurpose with or without fee is hereby granted.\r\n\r\nTHE SOFTWARE IS PROVIDED \"AS IS\" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH\r\nREGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY\r\nAND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,\r\nINDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM\r\nLOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR\r\nOTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR\r\nPERFORMANCE OF THIS SOFTWARE.\r\n***************************************************************************** */\r\n/* global Reflect, Promise */\r\n\r\nvar extendStatics = function(d, b) {\r\n    extendStatics = Object.setPrototypeOf ||\r\n        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\r\n        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };\r\n    return extendStatics(d, b);\r\n};\r\n\r\nfunction __extends(d, b) {\r\n    extendStatics(d, b);\r\n    function __() { this.constructor = d; }\r\n    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\r\n}\n\nvar ACTION;\r\n(function (ACTION) {\r\n    ACTION[ACTION[\"NONE\"] = 0] = \"NONE\";\r\n    ACTION[ACTION[\"ROTATE\"] = 1] = \"ROTATE\";\r\n    ACTION[ACTION[\"TRUCK\"] = 2] = \"TRUCK\";\r\n    ACTION[ACTION[\"OFFSET\"] = 3] = \"OFFSET\";\r\n    ACTION[ACTION[\"DOLLY\"] = 4] = \"DOLLY\";\r\n    ACTION[ACTION[\"ZOOM\"] = 5] = \"ZOOM\";\r\n    ACTION[ACTION[\"TOUCH_ROTATE\"] = 6] = \"TOUCH_ROTATE\";\r\n    ACTION[ACTION[\"TOUCH_TRUCK\"] = 7] = \"TOUCH_TRUCK\";\r\n    ACTION[ACTION[\"TOUCH_OFFSET\"] = 8] = \"TOUCH_OFFSET\";\r\n    ACTION[ACTION[\"TOUCH_DOLLY\"] = 9] = \"TOUCH_DOLLY\";\r\n    ACTION[ACTION[\"TOUCH_ZOOM\"] = 10] = \"TOUCH_ZOOM\";\r\n    ACTION[ACTION[\"TOUCH_DOLLY_TRUCK\"] = 11] = \"TOUCH_DOLLY_TRUCK\";\r\n    ACTION[ACTION[\"TOUCH_DOLLY_OFFSET\"] = 12] = \"TOUCH_DOLLY_OFFSET\";\r\n    ACTION[ACTION[\"TOUCH_ZOOM_TRUCK\"] = 13] = \"TOUCH_ZOOM_TRUCK\";\r\n    ACTION[ACTION[\"TOUCH_ZOOM_OFFSET\"] = 14] = \"TOUCH_ZOOM_OFFSET\";\r\n})(ACTION || (ACTION = {}));\n\nvar PI_2 = Math.PI * 2;\r\nvar PI_HALF = Math.PI / 2;\r\nvar FPS_60 = 1 / 0.016;\n\nvar EPSILON = 1e-5;\r\nfunction approxZero(number) {\r\n    return Math.abs(number) < EPSILON;\r\n}\r\nfunction approxEquals(a, b) {\r\n    return approxZero(a - b);\r\n}\r\nfunction roundToStep(value, step) {\r\n    return Math.round(value / step) * step;\r\n}\r\nfunction infinityToMaxNumber(value) {\r\n    if (isFinite(value))\r\n        return value;\r\n    if (value < 0)\r\n        return -Number.MAX_VALUE;\r\n    return Number.MAX_VALUE;\r\n}\r\nfunction maxNumberToInfinity(value) {\r\n    if (Math.abs(value) < Number.MAX_VALUE)\r\n        return value;\r\n    return value * Infinity;\r\n}\n\nfunction isTouchEvent(event) {\r\n    return 'TouchEvent' in window && event instanceof TouchEvent;\r\n}\n\nfunction extractClientCoordFromEvent(event, out) {\r\n    out.set(0, 0);\r\n    if (isTouchEvent(event)) {\r\n        var touchEvent = event;\r\n        for (var i = 0; i < touchEvent.touches.length; i++) {\r\n            out.x += touchEvent.touches[i].clientX;\r\n            out.y += touchEvent.touches[i].clientY;\r\n        }\r\n        out.x /= touchEvent.touches.length;\r\n        out.y /= touchEvent.touches.length;\r\n        return out;\r\n    }\r\n    else {\r\n        var mouseEvent = event;\r\n        out.set(mouseEvent.clientX, mouseEvent.clientY);\r\n        return out;\r\n    }\r\n}\n\nfunction notSupportedInOrthographicCamera(camera, message) {\r\n    if (!camera.isPerspectiveCamera) {\r\n        console.warn(message + \" is not supported in OrthographicCamera\");\r\n        return true;\r\n    }\r\n    return false;\r\n}\n\nvar EventDispatcher = (function () {\r\n    function EventDispatcher() {\r\n        this._listeners = {};\r\n    }\r\n    EventDispatcher.prototype.addEventListener = function (type, listener) {\r\n        var listeners = this._listeners;\r\n        if (listeners[type] === undefined)\r\n            listeners[type] = [];\r\n        if (listeners[type].indexOf(listener) === -1)\r\n            listeners[type].push(listener);\r\n    };\r\n    EventDispatcher.prototype.removeEventListener = function (type, listener) {\r\n        var listeners = this._listeners;\r\n        var listenerArray = listeners[type];\r\n        if (listenerArray !== undefined) {\r\n            var index = listenerArray.indexOf(listener);\r\n            if (index !== -1)\r\n                listenerArray.splice(index, 1);\r\n        }\r\n    };\r\n    EventDispatcher.prototype.removeAllEventListeners = function (type) {\r\n        if (!type) {\r\n            this._listeners = {};\r\n            return;\r\n        }\r\n        if (Array.isArray(this._listeners[type]))\r\n            this._listeners[type].length = 0;\r\n    };\r\n    EventDispatcher.prototype.dispatchEvent = function (event) {\r\n        var listeners = this._listeners;\r\n        var listenerArray = listeners[event.type];\r\n        if (listenerArray !== undefined) {\r\n            event.target = this;\r\n            var array = listenerArray.slice(0);\r\n            for (var i = 0, l = array.length; i < l; i++) {\r\n                array[i].call(this, event);\r\n            }\r\n        }\r\n    };\r\n    return EventDispatcher;\r\n}());\n\nvar isBrowser = typeof window !== 'undefined';\r\nvar isMac = isBrowser && /Mac/.test(navigator.platform);\r\nvar readonlyACTION = Object.freeze(ACTION);\r\nvar TOUCH_DOLLY_FACTOR = 1 / 8;\r\nvar THREE;\r\nvar _ORIGIN;\r\nvar _AXIS_Y;\r\nvar _AXIS_Z;\r\nvar _v2;\r\nvar _v3A;\r\nvar _v3B;\r\nvar _v3C;\r\nvar _xColumn;\r\nvar _yColumn;\r\nvar _zColumn;\r\nvar _sphericalA;\r\nvar _sphericalB;\r\nvar _box3A;\r\nvar _box3B;\r\nvar _sphere;\r\nvar _quaternionA;\r\nvar _quaternionB;\r\nvar _rotationMatrix;\r\nvar _raycaster;\r\nvar CameraControls = (function (_super) {\r\n    __extends(CameraControls, _super);\r\n    function CameraControls(camera, domElement) {\r\n        var _this = _super.call(this) || this;\r\n        _this.minPolarAngle = 0;\r\n        _this.maxPolarAngle = Math.PI;\r\n        _this.minAzimuthAngle = -Infinity;\r\n        _this.maxAzimuthAngle = Infinity;\r\n        _this.minDistance = 0;\r\n        _this.maxDistance = Infinity;\r\n        _this.infinityDolly = false;\r\n        _this.minZoom = 0.01;\r\n        _this.maxZoom = Infinity;\r\n        _this.dampingFactor = 0.05;\r\n        _this.draggingDampingFactor = 0.25;\r\n        _this.azimuthRotateSpeed = 1.0;\r\n        _this.polarRotateSpeed = 1.0;\r\n        _this.dollySpeed = 1.0;\r\n        _this.truckSpeed = 2.0;\r\n        _this.dollyToCursor = false;\r\n        _this.dragToOffset = false;\r\n        _this.verticalDragToForward = false;\r\n        _this.boundaryFriction = 0.0;\r\n        _this.colliderMeshes = [];\r\n        _this.cancel = function () { };\r\n        _this._enabled = true;\r\n        _this._state = ACTION.NONE;\r\n        _this._viewport = null;\r\n        _this._dollyControlAmount = 0;\r\n        _this._boundaryEnclosesCamera = false;\r\n        _this._needsUpdate = true;\r\n        _this._updatedLastTime = false;\r\n        if (typeof THREE === 'undefined') {\r\n            console.error('camera-controls: `THREE` is undefined. You must first run `CameraControls.install( { THREE: THREE } )`. Check the docs for further information.');\r\n        }\r\n        _this._camera = camera;\r\n        _this._yAxisUpSpace = new THREE.Quaternion().setFromUnitVectors(_this._camera.up, _AXIS_Y);\r\n        _this._yAxisUpSpaceInverse = _this._yAxisUpSpace.clone().inverse();\r\n        _this._state = ACTION.NONE;\r\n        _this._domElement = domElement;\r\n        _this._target = new THREE.Vector3();\r\n        _this._targetEnd = _this._target.clone();\r\n        _this._focalOffset = new THREE.Vector3();\r\n        _this._focalOffsetEnd = _this._focalOffset.clone();\r\n        _this._spherical = new THREE.Spherical().setFromVector3(_v3A.copy(_this._camera.position).applyQuaternion(_this._yAxisUpSpace));\r\n        _this._sphericalEnd = _this._spherical.clone();\r\n        _this._zoom = _this._camera.zoom;\r\n        _this._zoomEnd = _this._zoom;\r\n        _this._nearPlaneCorners = [\r\n            new THREE.Vector3(),\r\n            new THREE.Vector3(),\r\n            new THREE.Vector3(),\r\n            new THREE.Vector3(),\r\n        ];\r\n        _this._updateNearPlaneCorners();\r\n        _this._boundary = new THREE.Box3(new THREE.Vector3(-Infinity, -Infinity, -Infinity), new THREE.Vector3(Infinity, Infinity, Infinity));\r\n        _this._target0 = _this._target.clone();\r\n        _this._position0 = _this._camera.position.clone();\r\n        _this._zoom0 = _this._zoom;\r\n        _this._focalOffset0 = _this._focalOffset.clone();\r\n        _this._dollyControlAmount = 0;\r\n        _this._dollyControlCoord = new THREE.Vector2();\r\n        _this.mouseButtons = {\r\n            left: ACTION.ROTATE,\r\n            middle: ACTION.DOLLY,\r\n            right: ACTION.TRUCK,\r\n            wheel: _this._camera.isPerspectiveCamera ? ACTION.DOLLY :\r\n                _this._camera.isOrthographicCamera ? ACTION.ZOOM :\r\n                    ACTION.NONE,\r\n        };\r\n        _this.touches = {\r\n            one: ACTION.TOUCH_ROTATE,\r\n            two: _this._camera.isPerspectiveCamera ? ACTION.TOUCH_DOLLY_TRUCK :\r\n                _this._camera.isOrthographicCamera ? ACTION.TOUCH_ZOOM_TRUCK :\r\n                    ACTION.NONE,\r\n            three: ACTION.TOUCH_TRUCK,\r\n        };\r\n        if (_this._domElement) {\r\n            var dragStartPosition_1 = new THREE.Vector2();\r\n            var lastDragPosition_1 = new THREE.Vector2();\r\n            var dollyStart_1 = new THREE.Vector2();\r\n            var elementRect_1 = new THREE.Vector4();\r\n            var truckInternal_1 = function (deltaX, deltaY, dragToOffset) {\r\n                if (_this._camera.isPerspectiveCamera) {\r\n                    var camera_1 = _this._camera;\r\n                    var offset = _v3A.copy(camera_1.position).sub(_this._target);\r\n                    var fov = camera_1.getEffectiveFOV() * THREE.MathUtils.DEG2RAD;\r\n                    var targetDistance = offset.length() * Math.tan(fov * 0.5);\r\n                    var truckX = (_this.truckSpeed * deltaX * targetDistance / elementRect_1.w);\r\n                    var pedestalY = (_this.truckSpeed * deltaY * targetDistance / elementRect_1.w);\r\n                    if (_this.verticalDragToForward) {\r\n                        dragToOffset ?\r\n                            _this.setFocalOffset(_this._focalOffsetEnd.x + truckX, _this._focalOffsetEnd.y, _this._focalOffsetEnd.z, true) :\r\n                            _this.truck(truckX, 0, true);\r\n                        _this.forward(-pedestalY, true);\r\n                    }\r\n                    else {\r\n                        dragToOffset ?\r\n                            _this.setFocalOffset(_this._focalOffsetEnd.x + truckX, _this._focalOffsetEnd.y + pedestalY, _this._focalOffsetEnd.z, true) :\r\n                            _this.truck(truckX, pedestalY, true);\r\n                    }\r\n                }\r\n                else if (_this._camera.isOrthographicCamera) {\r\n                    var camera_2 = _this._camera;\r\n                    var truckX = deltaX * (camera_2.right - camera_2.left) / camera_2.zoom / elementRect_1.z;\r\n                    var pedestalY = deltaY * (camera_2.top - camera_2.bottom) / camera_2.zoom / elementRect_1.w;\r\n                    dragToOffset ?\r\n                        _this.setFocalOffset(_this._focalOffsetEnd.x + truckX, _this._focalOffsetEnd.y + pedestalY, _this._focalOffsetEnd.z, true) :\r\n                        _this.truck(truckX, pedestalY, true);\r\n                }\r\n            };\r\n            var rotateInternal_1 = function (deltaX, deltaY) {\r\n                var theta = PI_2 * _this.azimuthRotateSpeed * deltaX / elementRect_1.w;\r\n                var phi = PI_2 * _this.polarRotateSpeed * deltaY / elementRect_1.w;\r\n                _this.rotate(theta, phi, true);\r\n            };\r\n            var dollyInternal_1 = function (delta, x, y) {\r\n                var dollyScale = Math.pow(0.95, -delta * _this.dollySpeed);\r\n                var distance = _this._sphericalEnd.radius * dollyScale;\r\n                var prevRadius = _this._sphericalEnd.radius;\r\n                _this.dollyTo(distance);\r\n                if (_this.infinityDolly && distance < _this.minDistance) {\r\n                    _this._camera.getWorldDirection(_v3A);\r\n                    _this._targetEnd.add(_v3A.normalize().multiplyScalar(prevRadius));\r\n                    _this._target.add(_v3A.normalize().multiplyScalar(prevRadius));\r\n                }\r\n                if (_this.dollyToCursor) {\r\n                    _this._dollyControlAmount += _this._sphericalEnd.radius - prevRadius;\r\n                    _this._dollyControlCoord.set(x, y);\r\n                }\r\n                return;\r\n            };\r\n            var zoomInternal_1 = function (delta) {\r\n                var zoomScale = Math.pow(0.95, delta * _this.dollySpeed);\r\n                _this.zoomTo(_this._zoom * zoomScale);\r\n                return;\r\n            };\r\n            var cancelDragging_1 = function () {\r\n                _this._state = ACTION.NONE;\r\n                document.removeEventListener('mousemove', dragging_1);\r\n                document.removeEventListener('touchmove', dragging_1, { passive: false });\r\n                document.removeEventListener('mouseup', endDragging_1);\r\n                document.removeEventListener('touchend', endDragging_1);\r\n            };\r\n            var onMouseDown_1 = function (event) {\r\n                if (!_this._enabled)\r\n                    return;\r\n                cancelDragging_1();\r\n                switch (event.button) {\r\n                    case THREE.MOUSE.LEFT:\r\n                        _this._state = _this.mouseButtons.left;\r\n                        break;\r\n                    case THREE.MOUSE.MIDDLE:\r\n                        _this._state = _this.mouseButtons.middle;\r\n                        break;\r\n                    case THREE.MOUSE.RIGHT:\r\n                        _this._state = _this.mouseButtons.right;\r\n                        break;\r\n                }\r\n                startDragging_1(event);\r\n            };\r\n            var onTouchStart_1 = function (event) {\r\n                if (!_this._enabled)\r\n                    return;\r\n                cancelDragging_1();\r\n                switch (event.touches.length) {\r\n                    case 1:\r\n                        _this._state = _this.touches.one;\r\n                        break;\r\n                    case 2:\r\n                        _this._state = _this.touches.two;\r\n                        break;\r\n                    case 3:\r\n                        _this._state = _this.touches.three;\r\n                        break;\r\n                }\r\n                startDragging_1(event);\r\n            };\r\n            var lastScrollTimeStamp_1 = -1;\r\n            var onMouseWheel_1 = function (event) {\r\n                if (!_this._enabled || _this.mouseButtons.wheel === ACTION.NONE)\r\n                    return;\r\n                event.preventDefault();\r\n                if (_this.dollyToCursor ||\r\n                    _this.mouseButtons.wheel === ACTION.ROTATE ||\r\n                    _this.mouseButtons.wheel === ACTION.TRUCK) {\r\n                    var now = performance.now();\r\n                    if (lastScrollTimeStamp_1 - now < 1000)\r\n                        _this._getClientRect(elementRect_1);\r\n                    lastScrollTimeStamp_1 = now;\r\n                }\r\n                var deltaYFactor = isMac ? -1 : -3;\r\n                var delta = (event.deltaMode === 1) ? event.deltaY / deltaYFactor : event.deltaY / (deltaYFactor * 10);\r\n                var x = _this.dollyToCursor ? (event.clientX - elementRect_1.x) / elementRect_1.z * 2 - 1 : 0;\r\n                var y = _this.dollyToCursor ? (event.clientY - elementRect_1.y) / elementRect_1.w * -2 + 1 : 0;\r\n                switch (_this.mouseButtons.wheel) {\r\n                    case ACTION.ROTATE: {\r\n                        rotateInternal_1(event.deltaX, event.deltaY);\r\n                        break;\r\n                    }\r\n                    case ACTION.TRUCK: {\r\n                        truckInternal_1(event.deltaX, event.deltaY, false);\r\n                        break;\r\n                    }\r\n                    case ACTION.OFFSET: {\r\n                        truckInternal_1(event.deltaX, event.deltaY, true);\r\n                        break;\r\n                    }\r\n                    case ACTION.DOLLY: {\r\n                        dollyInternal_1(-delta, x, y);\r\n                        break;\r\n                    }\r\n                    case ACTION.ZOOM: {\r\n                        zoomInternal_1(-delta);\r\n                        break;\r\n                    }\r\n                }\r\n                _this.dispatchEvent({\r\n                    type: 'control',\r\n                    originalEvent: event,\r\n                });\r\n            };\r\n            var onContextMenu_1 = function (event) {\r\n                if (!_this._enabled)\r\n                    return;\r\n                event.preventDefault();\r\n            };\r\n            var startDragging_1 = function (event) {\r\n                if (!_this._enabled)\r\n                    return;\r\n                extractClientCoordFromEvent(event, _v2);\r\n                _this._getClientRect(elementRect_1);\r\n                dragStartPosition_1.copy(_v2);\r\n                lastDragPosition_1.copy(_v2);\r\n                var isMultiTouch = isTouchEvent(event) && event.touches.length >= 2;\r\n                if (isMultiTouch) {\r\n                    var touchEvent = event;\r\n                    var dx = _v2.x - touchEvent.touches[1].clientX;\r\n                    var dy = _v2.y - touchEvent.touches[1].clientY;\r\n                    var distance = Math.sqrt(dx * dx + dy * dy);\r\n                    dollyStart_1.set(0, distance);\r\n                    var x = (touchEvent.touches[0].clientX + touchEvent.touches[1].clientX) * 0.5;\r\n                    var y = (touchEvent.touches[0].clientY + touchEvent.touches[1].clientY) * 0.5;\r\n                    lastDragPosition_1.set(x, y);\r\n                }\r\n                document.addEventListener('mousemove', dragging_1);\r\n                document.addEventListener('touchmove', dragging_1, { passive: false });\r\n                document.addEventListener('mouseup', endDragging_1);\r\n                document.addEventListener('touchend', endDragging_1);\r\n                _this.dispatchEvent({\r\n                    type: 'controlstart',\r\n                    originalEvent: event,\r\n                });\r\n            };\r\n            var dragging_1 = function (event) {\r\n                if (!_this._enabled)\r\n                    return;\r\n                event.preventDefault();\r\n                extractClientCoordFromEvent(event, _v2);\r\n                var deltaX = lastDragPosition_1.x - _v2.x;\r\n                var deltaY = lastDragPosition_1.y - _v2.y;\r\n                lastDragPosition_1.copy(_v2);\r\n                switch (_this._state) {\r\n                    case ACTION.ROTATE:\r\n                    case ACTION.TOUCH_ROTATE: {\r\n                        rotateInternal_1(deltaX, deltaY);\r\n                        break;\r\n                    }\r\n                    case ACTION.DOLLY:\r\n                    case ACTION.ZOOM: {\r\n                        var dollyX = _this.dollyToCursor ? (dragStartPosition_1.x - elementRect_1.x) / elementRect_1.z * 2 - 1 : 0;\r\n                        var dollyY = _this.dollyToCursor ? (dragStartPosition_1.y - elementRect_1.y) / elementRect_1.w * -2 + 1 : 0;\r\n                        _this._state === ACTION.DOLLY ?\r\n                            dollyInternal_1(deltaY * TOUCH_DOLLY_FACTOR, dollyX, dollyY) :\r\n                            zoomInternal_1(deltaY * TOUCH_DOLLY_FACTOR);\r\n                        break;\r\n                    }\r\n                    case ACTION.TOUCH_DOLLY:\r\n                    case ACTION.TOUCH_ZOOM:\r\n                    case ACTION.TOUCH_DOLLY_TRUCK:\r\n                    case ACTION.TOUCH_ZOOM_TRUCK:\r\n                    case ACTION.TOUCH_DOLLY_OFFSET:\r\n                    case ACTION.TOUCH_ZOOM_OFFSET: {\r\n                        var touchEvent = event;\r\n                        var dx = _v2.x - touchEvent.touches[1].clientX;\r\n                        var dy = _v2.y - touchEvent.touches[1].clientY;\r\n                        var distance = Math.sqrt(dx * dx + dy * dy);\r\n                        var dollyDelta = dollyStart_1.y - distance;\r\n                        dollyStart_1.set(0, distance);\r\n                        var dollyX = _this.dollyToCursor ? (lastDragPosition_1.x - elementRect_1.x) / elementRect_1.z * 2 - 1 : 0;\r\n                        var dollyY = _this.dollyToCursor ? (lastDragPosition_1.y - elementRect_1.y) / elementRect_1.w * -2 + 1 : 0;\r\n                        _this._state === ACTION.TOUCH_DOLLY ||\r\n                            _this._state === ACTION.TOUCH_DOLLY_TRUCK ?\r\n                            dollyInternal_1(dollyDelta * TOUCH_DOLLY_FACTOR, dollyX, dollyY) :\r\n                            zoomInternal_1(dollyDelta * TOUCH_DOLLY_FACTOR);\r\n                        if (_this._state === ACTION.TOUCH_DOLLY_TRUCK ||\r\n                            _this._state === ACTION.TOUCH_ZOOM_TRUCK) {\r\n                            truckInternal_1(deltaX, deltaY, false);\r\n                        }\r\n                        else if (_this._state === ACTION.TOUCH_DOLLY_OFFSET ||\r\n                            _this._state === ACTION.TOUCH_ZOOM_OFFSET) {\r\n                            truckInternal_1(deltaX, deltaY, true);\r\n                        }\r\n                        break;\r\n                    }\r\n                    case ACTION.TRUCK:\r\n                    case ACTION.TOUCH_TRUCK: {\r\n                        truckInternal_1(deltaX, deltaY, false);\r\n                        break;\r\n                    }\r\n                    case ACTION.OFFSET:\r\n                    case ACTION.TOUCH_OFFSET: {\r\n                        truckInternal_1(deltaX, deltaY, true);\r\n                        break;\r\n                    }\r\n                }\r\n                _this.dispatchEvent({\r\n                    type: 'control',\r\n                    originalEvent: event,\r\n                });\r\n            };\r\n            var endDragging_1 = function (event) {\r\n                if (!_this._enabled)\r\n                    return;\r\n                cancelDragging_1();\r\n                _this.dispatchEvent({\r\n                    type: 'controlend',\r\n                    originalEvent: event,\r\n                });\r\n            };\r\n            _this._domElement.addEventListener('mousedown', onMouseDown_1);\r\n            _this._domElement.addEventListener('touchstart', onTouchStart_1);\r\n            _this._domElement.addEventListener('wheel', onMouseWheel_1);\r\n            _this._domElement.addEventListener('contextmenu', onContextMenu_1);\r\n            _this._removeAllEventListeners = function () {\r\n                _this._domElement.removeEventListener('mousedown', onMouseDown_1);\r\n                _this._domElement.removeEventListener('touchstart', onTouchStart_1);\r\n                _this._domElement.removeEventListener('wheel', onMouseWheel_1);\r\n                _this._domElement.removeEventListener('contextmenu', onContextMenu_1);\r\n                document.removeEventListener('mousemove', dragging_1);\r\n                document.removeEventListener('touchmove', dragging_1, { passive: false });\r\n                document.removeEventListener('mouseup', endDragging_1);\r\n                document.removeEventListener('touchend', endDragging_1);\r\n            };\r\n            _this.cancel = function () {\r\n                cancelDragging_1();\r\n                _this.dispatchEvent({\r\n                    type: 'controlend',\r\n                    originalEvent: null,\r\n                });\r\n            };\r\n        }\r\n        _this.update(0);\r\n        return _this;\r\n    }\r\n    CameraControls.install = function (libs) {\r\n        THREE = libs.THREE;\r\n        _ORIGIN = Object.freeze(new THREE.Vector3(0, 0, 0));\r\n        _AXIS_Y = Object.freeze(new THREE.Vector3(0, 1, 0));\r\n        _AXIS_Z = Object.freeze(new THREE.Vector3(0, 0, 1));\r\n        _v2 = new THREE.Vector2();\r\n        _v3A = new THREE.Vector3();\r\n        _v3B = new THREE.Vector3();\r\n        _v3C = new THREE.Vector3();\r\n        _xColumn = new THREE.Vector3();\r\n        _yColumn = new THREE.Vector3();\r\n        _zColumn = new THREE.Vector3();\r\n        _sphericalA = new THREE.Spherical();\r\n        _sphericalB = new THREE.Spherical();\r\n        _box3A = new THREE.Box3();\r\n        _box3B = new THREE.Box3();\r\n        _sphere = new THREE.Sphere();\r\n        _quaternionA = new THREE.Quaternion();\r\n        _quaternionB = new THREE.Quaternion();\r\n        _rotationMatrix = new THREE.Matrix4();\r\n        _raycaster = new THREE.Raycaster();\r\n    };\r\n    Object.defineProperty(CameraControls, \"ACTION\", {\r\n        get: function () {\r\n            return readonlyACTION;\r\n        },\r\n        enumerable: false,\r\n        configurable: true\r\n    });\r\n    Object.defineProperty(CameraControls.prototype, \"enabled\", {\r\n        get: function () {\r\n            return this._enabled;\r\n        },\r\n        set: function (enabled) {\r\n            this._enabled = enabled;\r\n            if (!enabled)\r\n                this.cancel();\r\n        },\r\n        enumerable: false,\r\n        configurable: true\r\n    });\r\n    Object.defineProperty(CameraControls.prototype, \"currentAction\", {\r\n        get: function () {\r\n            return this._state;\r\n        },\r\n        enumerable: false,\r\n        configurable: true\r\n    });\r\n    Object.defineProperty(CameraControls.prototype, \"distance\", {\r\n        get: function () {\r\n            return this._spherical.radius;\r\n        },\r\n        set: function (distance) {\r\n            if (this._spherical.radius === distance &&\r\n                this._sphericalEnd.radius === distance)\r\n                return;\r\n            this._spherical.radius = distance;\r\n            this._sphericalEnd.radius = distance;\r\n            this._needsUpdate = true;\r\n        },\r\n        enumerable: false,\r\n        configurable: true\r\n    });\r\n    Object.defineProperty(CameraControls.prototype, \"azimuthAngle\", {\r\n        get: function () {\r\n            return this._spherical.theta;\r\n        },\r\n        set: function (azimuthAngle) {\r\n            if (this._spherical.theta === azimuthAngle &&\r\n                this._sphericalEnd.theta === azimuthAngle)\r\n                return;\r\n            this._spherical.theta = azimuthAngle;\r\n            this._sphericalEnd.theta = azimuthAngle;\r\n            this._needsUpdate = true;\r\n        },\r\n        enumerable: false,\r\n        configurable: true\r\n    });\r\n    Object.defineProperty(CameraControls.prototype, \"polarAngle\", {\r\n        get: function () {\r\n            return this._spherical.phi;\r\n        },\r\n        set: function (polarAngle) {\r\n            if (this._spherical.phi === polarAngle &&\r\n                this._sphericalEnd.phi === polarAngle)\r\n                return;\r\n            this._spherical.phi = polarAngle;\r\n            this._sphericalEnd.phi = polarAngle;\r\n            this._needsUpdate = true;\r\n        },\r\n        enumerable: false,\r\n        configurable: true\r\n    });\r\n    Object.defineProperty(CameraControls.prototype, \"phiSpeed\", {\r\n        set: function (speed) {\r\n            console.warn('phiSpeed was renamed. use azimuthRotateSpeed instead');\r\n            this.azimuthRotateSpeed = speed;\r\n        },\r\n        enumerable: false,\r\n        configurable: true\r\n    });\r\n    Object.defineProperty(CameraControls.prototype, \"thetaSpeed\", {\r\n        set: function (speed) {\r\n            console.warn('thetaSpeed was renamed. use polarRotateSpeed instead');\r\n            this.polarRotateSpeed = speed;\r\n        },\r\n        enumerable: false,\r\n        configurable: true\r\n    });\r\n    Object.defineProperty(CameraControls.prototype, \"boundaryEnclosesCamera\", {\r\n        get: function () {\r\n            return this._boundaryEnclosesCamera;\r\n        },\r\n        set: function (boundaryEnclosesCamera) {\r\n            this._boundaryEnclosesCamera = boundaryEnclosesCamera;\r\n            this._needsUpdate = true;\r\n        },\r\n        enumerable: false,\r\n        configurable: true\r\n    });\r\n    CameraControls.prototype.addEventListener = function (type, listener) {\r\n        _super.prototype.addEventListener.call(this, type, listener);\r\n    };\r\n    CameraControls.prototype.removeEventListener = function (type, listener) {\r\n        _super.prototype.removeEventListener.call(this, type, listener);\r\n    };\r\n    CameraControls.prototype.rotate = function (azimuthAngle, polarAngle, enableTransition) {\r\n        if (enableTransition === void 0) { enableTransition = false; }\r\n        this.rotateTo(this._sphericalEnd.theta + azimuthAngle, this._sphericalEnd.phi + polarAngle, enableTransition);\r\n    };\r\n    CameraControls.prototype.rotateTo = function (azimuthAngle, polarAngle, enableTransition) {\r\n        if (enableTransition === void 0) { enableTransition = false; }\r\n        var theta = THREE.MathUtils.clamp(azimuthAngle, this.minAzimuthAngle, this.maxAzimuthAngle);\r\n        var phi = THREE.MathUtils.clamp(polarAngle, this.minPolarAngle, this.maxPolarAngle);\r\n        this._sphericalEnd.theta = theta;\r\n        this._sphericalEnd.phi = phi;\r\n        this._sphericalEnd.makeSafe();\r\n        if (!enableTransition) {\r\n            this._spherical.theta = this._sphericalEnd.theta;\r\n            this._spherical.phi = this._sphericalEnd.phi;\r\n        }\r\n        this._needsUpdate = true;\r\n    };\r\n    CameraControls.prototype.dolly = function (distance, enableTransition) {\r\n        if (enableTransition === void 0) { enableTransition = false; }\r\n        this.dollyTo(this._sphericalEnd.radius - distance, enableTransition);\r\n    };\r\n    CameraControls.prototype.dollyTo = function (distance, enableTransition) {\r\n        if (enableTransition === void 0) { enableTransition = false; }\r\n        if (notSupportedInOrthographicCamera(this._camera, 'dolly'))\r\n            return;\r\n        this._sphericalEnd.radius = THREE.MathUtils.clamp(distance, this.minDistance, this.maxDistance);\r\n        if (!enableTransition) {\r\n            this._spherical.radius = this._sphericalEnd.radius;\r\n        }\r\n        this._needsUpdate = true;\r\n    };\r\n    CameraControls.prototype.zoom = function (zoomStep, enableTransition) {\r\n        if (enableTransition === void 0) { enableTransition = false; }\r\n        this.zoomTo(this._zoomEnd + zoomStep, enableTransition);\r\n    };\r\n    CameraControls.prototype.zoomTo = function (zoom, enableTransition) {\r\n        if (enableTransition === void 0) { enableTransition = false; }\r\n        this._zoomEnd = THREE.MathUtils.clamp(zoom, this.minZoom, this.maxZoom);\r\n        if (!enableTransition) {\r\n            this._zoom = this._zoomEnd;\r\n        }\r\n        this._needsUpdate = true;\r\n    };\r\n    CameraControls.prototype.pan = function (x, y, enableTransition) {\r\n        if (enableTransition === void 0) { enableTransition = false; }\r\n        console.log('`pan` has been renamed to `truck`');\r\n        this.truck(x, y, enableTransition);\r\n    };\r\n    CameraControls.prototype.truck = function (x, y, enableTransition) {\r\n        if (enableTransition === void 0) { enableTransition = false; }\r\n        this._camera.updateMatrix();\r\n        _xColumn.setFromMatrixColumn(this._camera.matrix, 0);\r\n        _yColumn.setFromMatrixColumn(this._camera.matrix, 1);\r\n        _xColumn.multiplyScalar(x);\r\n        _yColumn.multiplyScalar(-y);\r\n        var offset = _v3A.copy(_xColumn).add(_yColumn);\r\n        this._encloseToBoundary(this._targetEnd, offset, this.boundaryFriction);\r\n        if (!enableTransition) {\r\n            this._target.copy(this._targetEnd);\r\n        }\r\n        this._needsUpdate = true;\r\n    };\r\n    CameraControls.prototype.forward = function (distance, enableTransition) {\r\n        if (enableTransition === void 0) { enableTransition = false; }\r\n        _v3A.setFromMatrixColumn(this._camera.matrix, 0);\r\n        _v3A.crossVectors(this._camera.up, _v3A);\r\n        _v3A.multiplyScalar(distance);\r\n        this._encloseToBoundary(this._targetEnd, _v3A, this.boundaryFriction);\r\n        if (!enableTransition) {\r\n            this._target.copy(this._targetEnd);\r\n        }\r\n        this._needsUpdate = true;\r\n    };\r\n    CameraControls.prototype.moveTo = function (x, y, z, enableTransition) {\r\n        if (enableTransition === void 0) { enableTransition = false; }\r\n        this._targetEnd.set(x, y, z);\r\n        if (!enableTransition) {\r\n            this._target.copy(this._targetEnd);\r\n        }\r\n        this._needsUpdate = true;\r\n    };\r\n    CameraControls.prototype.fitToBox = function (box3OrObject, enableTransition, _a) {\r\n        var _b = _a === void 0 ? {} : _a, _c = _b.paddingLeft, paddingLeft = _c === void 0 ? 0 : _c, _d = _b.paddingRight, paddingRight = _d === void 0 ? 0 : _d, _e = _b.paddingBottom, paddingBottom = _e === void 0 ? 0 : _e, _f = _b.paddingTop, paddingTop = _f === void 0 ? 0 : _f;\r\n        var aabb = box3OrObject.isBox3\r\n            ? _box3A.copy(box3OrObject)\r\n            : _box3A.setFromObject(box3OrObject);\r\n        if (aabb.isEmpty()) {\r\n            console.warn('camera-controls: fitTo() cannot be used with an empty box. Aborting');\r\n            return;\r\n        }\r\n        var theta = roundToStep(this._sphericalEnd.theta, PI_HALF);\r\n        var phi = roundToStep(this._sphericalEnd.phi, PI_HALF);\r\n        this.rotateTo(theta, phi, enableTransition);\r\n        var normal = _v3A.setFromSpherical(this._sphericalEnd).normalize();\r\n        var rotation = _quaternionA.setFromUnitVectors(normal, _AXIS_Z);\r\n        var viewFromPolar = approxEquals(Math.abs(normal.y), 1);\r\n        if (viewFromPolar) {\r\n            rotation.multiply(_quaternionB.setFromAxisAngle(_AXIS_Y, theta));\r\n        }\r\n        var bb = _box3B.makeEmpty();\r\n        _v3B.copy(aabb.min).applyQuaternion(rotation);\r\n        bb.expandByPoint(_v3B);\r\n        _v3B.copy(aabb.min).setX(aabb.max.x).applyQuaternion(rotation);\r\n        bb.expandByPoint(_v3B);\r\n        _v3B.copy(aabb.min).setY(aabb.max.y).applyQuaternion(rotation);\r\n        bb.expandByPoint(_v3B);\r\n        _v3B.copy(aabb.max).setZ(aabb.min.z).applyQuaternion(rotation);\r\n        bb.expandByPoint(_v3B);\r\n        _v3B.copy(aabb.min).setZ(aabb.max.z).applyQuaternion(rotation);\r\n        bb.expandByPoint(_v3B);\r\n        _v3B.copy(aabb.max).setY(aabb.min.y).applyQuaternion(rotation);\r\n        bb.expandByPoint(_v3B);\r\n        _v3B.copy(aabb.max).setX(aabb.min.x).applyQuaternion(rotation);\r\n        bb.expandByPoint(_v3B);\r\n        _v3B.copy(aabb.max).applyQuaternion(rotation);\r\n        bb.expandByPoint(_v3B);\r\n        rotation.setFromUnitVectors(_AXIS_Z, normal);\r\n        bb.min.x -= paddingLeft;\r\n        bb.min.y -= paddingBottom;\r\n        bb.max.x += paddingRight;\r\n        bb.max.y += paddingTop;\r\n        var bbSize = bb.getSize(_v3A);\r\n        var center = bb.getCenter(_v3B).applyQuaternion(rotation);\r\n        var isPerspectiveCamera = this._camera.isPerspectiveCamera;\r\n        var isOrthographicCamera = this._camera.isOrthographicCamera;\r\n        if (isPerspectiveCamera) {\r\n            var distance = this.getDistanceToFitBox(bbSize.x, bbSize.y, bbSize.z);\r\n            this.moveTo(center.x, center.y, center.z, enableTransition);\r\n            this.dollyTo(distance, enableTransition);\r\n            this.setFocalOffset(0, 0, 0, enableTransition);\r\n            return;\r\n        }\r\n        else if (isOrthographicCamera) {\r\n            var camera = this._camera;\r\n            var width = camera.right - camera.left;\r\n            var height = camera.top - camera.bottom;\r\n            var zoom = Math.min(width / bbSize.x, height / bbSize.y);\r\n            this.moveTo(center.x, center.y, center.z, enableTransition);\r\n            this.zoomTo(zoom, enableTransition);\r\n            this.setFocalOffset(0, 0, 0, enableTransition);\r\n            return;\r\n        }\r\n    };\r\n    CameraControls.prototype.fitTo = function (box3OrObject, enableTransition, fitToOptions) {\r\n        if (fitToOptions === void 0) { fitToOptions = {}; }\r\n        console.warn('camera-controls: fitTo() has been renamed to fitToBox()');\r\n        this.fitToBox(box3OrObject, enableTransition, fitToOptions);\r\n    };\r\n    CameraControls.prototype.fitToSphere = function (sphereOrMesh, enableTransition) {\r\n        var isSphere = sphereOrMesh instanceof THREE.Sphere;\r\n        var boundingSphere = isSphere ?\r\n            _sphere.copy(sphereOrMesh) :\r\n            createBoundingSphere(sphereOrMesh, _sphere);\r\n        var distanceToFit = this.getDistanceToFitSphere(boundingSphere.radius);\r\n        this.moveTo(boundingSphere.center.x, boundingSphere.center.y, boundingSphere.center.z, enableTransition);\r\n        this.dollyTo(distanceToFit, enableTransition);\r\n        this.setFocalOffset(0, 0, 0, enableTransition);\r\n    };\r\n    CameraControls.prototype.setLookAt = function (positionX, positionY, positionZ, targetX, targetY, targetZ, enableTransition) {\r\n        if (enableTransition === void 0) { enableTransition = false; }\r\n        var position = _v3A.set(positionX, positionY, positionZ);\r\n        var target = _v3B.set(targetX, targetY, targetZ);\r\n        this._targetEnd.copy(target);\r\n        this._sphericalEnd.setFromVector3(position.sub(target).applyQuaternion(this._yAxisUpSpace));\r\n        this.normalizeRotations();\r\n        if (!enableTransition) {\r\n            this._target.copy(this._targetEnd);\r\n            this._spherical.copy(this._sphericalEnd);\r\n        }\r\n        this._needsUpdate = true;\r\n    };\r\n    CameraControls.prototype.lerpLookAt = function (positionAX, positionAY, positionAZ, targetAX, targetAY, targetAZ, positionBX, positionBY, positionBZ, targetBX, targetBY, targetBZ, t, enableTransition) {\r\n        if (enableTransition === void 0) { enableTransition = false; }\r\n        var positionA = _v3A.set(positionAX, positionAY, positionAZ);\r\n        var targetA = _v3B.set(targetAX, targetAY, targetAZ);\r\n        _sphericalA.setFromVector3(positionA.sub(targetA).applyQuaternion(this._yAxisUpSpace));\r\n        var targetB = _v3A.set(targetBX, targetBY, targetBZ);\r\n        this._targetEnd.copy(targetA).lerp(targetB, t);\r\n        var positionB = _v3B.set(positionBX, positionBY, positionBZ);\r\n        _sphericalB.setFromVector3(positionB.sub(targetB).applyQuaternion(this._yAxisUpSpace));\r\n        var deltaTheta = _sphericalB.theta - _sphericalA.theta;\r\n        var deltaPhi = _sphericalB.phi - _sphericalA.phi;\r\n        var deltaRadius = _sphericalB.radius - _sphericalA.radius;\r\n        this._sphericalEnd.set(_sphericalA.radius + deltaRadius * t, _sphericalA.phi + deltaPhi * t, _sphericalA.theta + deltaTheta * t);\r\n        this.normalizeRotations();\r\n        if (!enableTransition) {\r\n            this._target.copy(this._targetEnd);\r\n            this._spherical.copy(this._sphericalEnd);\r\n        }\r\n        this._needsUpdate = true;\r\n    };\r\n    CameraControls.prototype.setPosition = function (positionX, positionY, positionZ, enableTransition) {\r\n        if (enableTransition === void 0) { enableTransition = false; }\r\n        this.setLookAt(positionX, positionY, positionZ, this._targetEnd.x, this._targetEnd.y, this._targetEnd.z, enableTransition);\r\n    };\r\n    CameraControls.prototype.setTarget = function (targetX, targetY, targetZ, enableTransition) {\r\n        if (enableTransition === void 0) { enableTransition = false; }\r\n        var pos = this.getPosition(_v3A);\r\n        this.setLookAt(pos.x, pos.y, pos.z, targetX, targetY, targetZ, enableTransition);\r\n    };\r\n    CameraControls.prototype.setFocalOffset = function (x, y, z, enableTransition) {\r\n        if (enableTransition === void 0) { enableTransition = false; }\r\n        this._focalOffsetEnd.set(x, y, z);\r\n        if (!enableTransition) {\r\n            this._focalOffset.copy(this._focalOffsetEnd);\r\n        }\r\n        this._needsUpdate = true;\r\n    };\r\n    CameraControls.prototype.setBoundary = function (box3) {\r\n        if (!box3) {\r\n            this._boundary.min.set(-Infinity, -Infinity, -Infinity);\r\n            this._boundary.max.set(Infinity, Infinity, Infinity);\r\n            this._needsUpdate = true;\r\n            return;\r\n        }\r\n        this._boundary.copy(box3);\r\n        this._boundary.clampPoint(this._targetEnd, this._targetEnd);\r\n        this._needsUpdate = true;\r\n    };\r\n    CameraControls.prototype.setViewport = function (viewportOrX, y, width, height) {\r\n        if (viewportOrX === null) {\r\n            this._viewport = null;\r\n            return;\r\n        }\r\n        this._viewport = this._viewport || new THREE.Vector4();\r\n        if (typeof viewportOrX === 'number') {\r\n            this._viewport.set(viewportOrX, y, width, height);\r\n        }\r\n        else {\r\n            this._viewport.copy(viewportOrX);\r\n        }\r\n    };\r\n    CameraControls.prototype.getDistanceToFitBox = function (width, height, depth) {\r\n        if (notSupportedInOrthographicCamera(this._camera, 'getDistanceToFit'))\r\n            return this._spherical.radius;\r\n        var camera = this._camera;\r\n        var boundingRectAspect = width / height;\r\n        var fov = camera.getEffectiveFOV() * THREE.MathUtils.DEG2RAD;\r\n        var aspect = camera.aspect;\r\n        var heightToFit = boundingRectAspect < aspect ? height : width / aspect;\r\n        return heightToFit * 0.5 / Math.tan(fov * 0.5) + depth * 0.5;\r\n    };\r\n    CameraControls.prototype.getDistanceToFit = function (width, height, depth) {\r\n        console.warn('camera-controls: getDistanceToFit() has been renamed to getDistanceToFitBox()');\r\n        return this.getDistanceToFitBox(width, height, depth);\r\n    };\r\n    CameraControls.prototype.getDistanceToFitSphere = function (radius) {\r\n        if (notSupportedInOrthographicCamera(this._camera, 'getDistanceToFitSphere'))\r\n            return this._spherical.radius;\r\n        var camera = this._camera;\r\n        var vFOV = camera.getEffectiveFOV() * THREE.MathUtils.DEG2RAD;\r\n        var hFOV = Math.atan(Math.tan(vFOV * 0.5) * camera.aspect) * 2;\r\n        var fov = 1 < camera.aspect ? vFOV : hFOV;\r\n        return radius / (Math.sin(fov * 0.5));\r\n    };\r\n    CameraControls.prototype.getTarget = function (out) {\r\n        var _out = !!out && out.isVector3 ? out : new THREE.Vector3();\r\n        return _out.copy(this._targetEnd);\r\n    };\r\n    CameraControls.prototype.getPosition = function (out) {\r\n        var _out = !!out && out.isVector3 ? out : new THREE.Vector3();\r\n        return _out.setFromSpherical(this._sphericalEnd).applyQuaternion(this._yAxisUpSpaceInverse).add(this._targetEnd);\r\n    };\r\n    CameraControls.prototype.getFocalOffset = function (out) {\r\n        var _out = !!out && out.isVector3 ? out : new THREE.Vector3();\r\n        return _out.copy(this._focalOffsetEnd);\r\n    };\r\n    CameraControls.prototype.normalizeRotations = function () {\r\n        this._sphericalEnd.theta = this._sphericalEnd.theta % PI_2;\r\n        if (this._sphericalEnd.theta < 0)\r\n            this._sphericalEnd.theta += PI_2;\r\n        this._spherical.theta += PI_2 * Math.round((this._sphericalEnd.theta - this._spherical.theta) / PI_2);\r\n    };\r\n    CameraControls.prototype.reset = function (enableTransition) {\r\n        if (enableTransition === void 0) { enableTransition = false; }\r\n        this.setLookAt(this._position0.x, this._position0.y, this._position0.z, this._target0.x, this._target0.y, this._target0.z, enableTransition);\r\n        this.setFocalOffset(this._focalOffset0.x, this._focalOffset0.y, this._focalOffset0.z, enableTransition);\r\n        this.zoomTo(this._zoom0, enableTransition);\r\n    };\r\n    CameraControls.prototype.saveState = function () {\r\n        this._target0.copy(this._target);\r\n        this._position0.copy(this._camera.position);\r\n        this._zoom0 = this._zoom;\r\n    };\r\n    CameraControls.prototype.updateCameraUp = function () {\r\n        this._yAxisUpSpace.setFromUnitVectors(this._camera.up, _AXIS_Y);\r\n        this._yAxisUpSpaceInverse.copy(this._yAxisUpSpace).inverse();\r\n    };\r\n    CameraControls.prototype.update = function (delta) {\r\n        var dampingFactor = this._state === ACTION.NONE ? this.dampingFactor : this.draggingDampingFactor;\r\n        var lerpRatio = 1.0 - Math.exp(-dampingFactor * delta * FPS_60);\r\n        var deltaTheta = this._sphericalEnd.theta - this._spherical.theta;\r\n        var deltaPhi = this._sphericalEnd.phi - this._spherical.phi;\r\n        var deltaRadius = this._sphericalEnd.radius - this._spherical.radius;\r\n        var deltaTarget = _v3A.subVectors(this._targetEnd, this._target);\r\n        var deltaOffset = _v3B.subVectors(this._focalOffsetEnd, this._focalOffset);\r\n        if (!approxZero(deltaTheta) ||\r\n            !approxZero(deltaPhi) ||\r\n            !approxZero(deltaRadius) ||\r\n            !approxZero(deltaTarget.x) ||\r\n            !approxZero(deltaTarget.y) ||\r\n            !approxZero(deltaTarget.z) ||\r\n            !approxZero(deltaOffset.x) ||\r\n            !approxZero(deltaOffset.y) ||\r\n            !approxZero(deltaOffset.z)) {\r\n            this._spherical.set(this._spherical.radius + deltaRadius * lerpRatio, this._spherical.phi + deltaPhi * lerpRatio, this._spherical.theta + deltaTheta * lerpRatio);\r\n            this._target.add(deltaTarget.multiplyScalar(lerpRatio));\r\n            this._focalOffset.add(deltaOffset.multiplyScalar(lerpRatio));\r\n            this._needsUpdate = true;\r\n        }\r\n        else {\r\n            this._spherical.copy(this._sphericalEnd);\r\n            this._target.copy(this._targetEnd);\r\n            this._focalOffset.copy(this._focalOffsetEnd);\r\n        }\r\n        if (this._dollyControlAmount !== 0) {\r\n            if (this._camera.isPerspectiveCamera) {\r\n                var camera = this._camera;\r\n                var direction = _v3A.setFromSpherical(this._sphericalEnd).applyQuaternion(this._yAxisUpSpaceInverse).normalize().negate();\r\n                var planeX = _v3B.copy(direction).cross(camera.up).normalize();\r\n                if (planeX.lengthSq() === 0)\r\n                    planeX.x = 1.0;\r\n                var planeY = _v3C.crossVectors(planeX, direction);\r\n                var worldToScreen = this._sphericalEnd.radius * Math.tan(camera.getEffectiveFOV() * THREE.MathUtils.DEG2RAD * 0.5);\r\n                var prevRadius = this._sphericalEnd.radius - this._dollyControlAmount;\r\n                var lerpRatio_1 = (prevRadius - this._sphericalEnd.radius) / this._sphericalEnd.radius;\r\n                var cursor = _v3A.copy(this._targetEnd)\r\n                    .add(planeX.multiplyScalar(this._dollyControlCoord.x * worldToScreen * camera.aspect))\r\n                    .add(planeY.multiplyScalar(this._dollyControlCoord.y * worldToScreen));\r\n                this._targetEnd.lerp(cursor, lerpRatio_1);\r\n                this._target.copy(this._targetEnd);\r\n            }\r\n            this._dollyControlAmount = 0;\r\n        }\r\n        var maxDistance = this._collisionTest();\r\n        this._spherical.radius = Math.min(this._spherical.radius, maxDistance);\r\n        this._spherical.makeSafe();\r\n        this._camera.position.setFromSpherical(this._spherical).applyQuaternion(this._yAxisUpSpaceInverse).add(this._target);\r\n        this._camera.lookAt(this._target);\r\n        var affectOffset = !approxZero(this._focalOffset.x) ||\r\n            !approxZero(this._focalOffset.y) ||\r\n            !approxZero(this._focalOffset.z);\r\n        if (affectOffset) {\r\n            this._camera.updateMatrix();\r\n            _xColumn.setFromMatrixColumn(this._camera.matrix, 0);\r\n            _yColumn.setFromMatrixColumn(this._camera.matrix, 1);\r\n            _zColumn.setFromMatrixColumn(this._camera.matrix, 2);\r\n            _xColumn.multiplyScalar(this._focalOffset.x);\r\n            _yColumn.multiplyScalar(-this._focalOffset.y);\r\n            _zColumn.multiplyScalar(this._focalOffset.z);\r\n            _v3A.copy(_xColumn).add(_yColumn).add(_zColumn);\r\n            this._camera.position.add(_v3A);\r\n        }\r\n        if (this._boundaryEnclosesCamera) {\r\n            this._encloseToBoundary(this._camera.position.copy(this._target), _v3A.setFromSpherical(this._spherical).applyQuaternion(this._yAxisUpSpaceInverse), 1.0);\r\n        }\r\n        var zoomDelta = this._zoomEnd - this._zoom;\r\n        this._zoom += zoomDelta * lerpRatio;\r\n        if (this._camera.zoom !== this._zoom) {\r\n            if (approxZero(zoomDelta))\r\n                this._zoom = this._zoomEnd;\r\n            this._camera.zoom = this._zoom;\r\n            this._camera.updateProjectionMatrix();\r\n            this._updateNearPlaneCorners();\r\n            this._needsUpdate = true;\r\n        }\r\n        var updated = this._needsUpdate;\r\n        if (updated && !this._updatedLastTime) {\r\n            this.dispatchEvent({ type: 'wake' });\r\n            this.dispatchEvent({ type: 'update' });\r\n        }\r\n        else if (updated) {\r\n            this.dispatchEvent({ type: 'update' });\r\n        }\r\n        else if (!updated && this._updatedLastTime) {\r\n            this.dispatchEvent({ type: 'sleep' });\r\n        }\r\n        this._updatedLastTime = updated;\r\n        this._needsUpdate = false;\r\n        return updated;\r\n    };\r\n    CameraControls.prototype.toJSON = function () {\r\n        return JSON.stringify({\r\n            enabled: this._enabled,\r\n            minDistance: this.minDistance,\r\n            maxDistance: infinityToMaxNumber(this.maxDistance),\r\n            minZoom: this.minZoom,\r\n            maxZoom: infinityToMaxNumber(this.maxZoom),\r\n            minPolarAngle: this.minPolarAngle,\r\n            maxPolarAngle: infinityToMaxNumber(this.maxPolarAngle),\r\n            minAzimuthAngle: infinityToMaxNumber(this.minAzimuthAngle),\r\n            maxAzimuthAngle: infinityToMaxNumber(this.maxAzimuthAngle),\r\n            dampingFactor: this.dampingFactor,\r\n            draggingDampingFactor: this.draggingDampingFactor,\r\n            dollySpeed: this.dollySpeed,\r\n            truckSpeed: this.truckSpeed,\r\n            dollyToCursor: this.dollyToCursor,\r\n            verticalDragToForward: this.verticalDragToForward,\r\n            target: this._targetEnd.toArray(),\r\n            position: _v3A.setFromSpherical(this._sphericalEnd).add(this._targetEnd).toArray(),\r\n            zoom: this._zoomEnd,\r\n            focalOffset: this._focalOffsetEnd.toArray(),\r\n            target0: this._target0.toArray(),\r\n            position0: this._position0.toArray(),\r\n            zoom0: this._zoom0,\r\n            focalOffset0: this._focalOffset0.toArray(),\r\n        });\r\n    };\r\n    CameraControls.prototype.fromJSON = function (json, enableTransition) {\r\n        if (enableTransition === void 0) { enableTransition = false; }\r\n        var obj = JSON.parse(json);\r\n        var position = _v3A.fromArray(obj.position);\r\n        this.enabled = obj.enabled;\r\n        this.minDistance = obj.minDistance;\r\n        this.maxDistance = maxNumberToInfinity(obj.maxDistance);\r\n        this.minZoom = obj.minZoom;\r\n        this.maxZoom = maxNumberToInfinity(obj.maxZoom);\r\n        this.minPolarAngle = obj.minPolarAngle;\r\n        this.maxPolarAngle = maxNumberToInfinity(obj.maxPolarAngle);\r\n        this.minAzimuthAngle = maxNumberToInfinity(obj.minAzimuthAngle);\r\n        this.maxAzimuthAngle = maxNumberToInfinity(obj.maxAzimuthAngle);\r\n        this.dampingFactor = obj.dampingFactor;\r\n        this.draggingDampingFactor = obj.draggingDampingFactor;\r\n        this.dollySpeed = obj.dollySpeed;\r\n        this.truckSpeed = obj.truckSpeed;\r\n        this.dollyToCursor = obj.dollyToCursor;\r\n        this.verticalDragToForward = obj.verticalDragToForward;\r\n        this._target0.fromArray(obj.target0);\r\n        this._position0.fromArray(obj.position0);\r\n        this._zoom0 = obj.zoom0;\r\n        this._focalOffset0.fromArray(obj.focalOffset0);\r\n        this.moveTo(obj.target[0], obj.target[1], obj.target[2], enableTransition);\r\n        _sphericalA.setFromVector3(position.sub(this._targetEnd).applyQuaternion(this._yAxisUpSpace));\r\n        this.rotateTo(_sphericalA.theta, _sphericalA.phi, enableTransition);\r\n        this.zoomTo(obj.zoom, enableTransition);\r\n        this.setFocalOffset(obj.focalOffset[0], obj.focalOffset[1], obj.focalOffset[2], enableTransition);\r\n        this._needsUpdate = true;\r\n    };\r\n    CameraControls.prototype.dispose = function () {\r\n        this._removeAllEventListeners();\r\n    };\r\n    CameraControls.prototype._encloseToBoundary = function (position, offset, friction) {\r\n        var offsetLength2 = offset.lengthSq();\r\n        if (offsetLength2 === 0.0) {\r\n            return position;\r\n        }\r\n        var newTarget = _v3B.copy(offset).add(position);\r\n        var clampedTarget = this._boundary.clampPoint(newTarget, _v3C);\r\n        var deltaClampedTarget = clampedTarget.sub(newTarget);\r\n        var deltaClampedTargetLength2 = deltaClampedTarget.lengthSq();\r\n        if (deltaClampedTargetLength2 === 0.0) {\r\n            return position.add(offset);\r\n        }\r\n        else if (deltaClampedTargetLength2 === offsetLength2) {\r\n            return position;\r\n        }\r\n        else if (friction === 0.0) {\r\n            return position.add(offset).add(deltaClampedTarget);\r\n        }\r\n        else {\r\n            var offsetFactor = 1.0 + friction * deltaClampedTargetLength2 / offset.dot(deltaClampedTarget);\r\n            return position\r\n                .add(_v3B.copy(offset).multiplyScalar(offsetFactor))\r\n                .add(deltaClampedTarget.multiplyScalar(1.0 - friction));\r\n        }\r\n    };\r\n    CameraControls.prototype._updateNearPlaneCorners = function () {\r\n        if (this._camera.isPerspectiveCamera) {\r\n            var camera = this._camera;\r\n            var near = camera.near;\r\n            var fov = camera.getEffectiveFOV() * THREE.MathUtils.DEG2RAD;\r\n            var heightHalf = Math.tan(fov * 0.5) * near;\r\n            var widthHalf = heightHalf * camera.aspect;\r\n            this._nearPlaneCorners[0].set(-widthHalf, -heightHalf, 0);\r\n            this._nearPlaneCorners[1].set(widthHalf, -heightHalf, 0);\r\n            this._nearPlaneCorners[2].set(widthHalf, heightHalf, 0);\r\n            this._nearPlaneCorners[3].set(-widthHalf, heightHalf, 0);\r\n        }\r\n        else if (this._camera.isOrthographicCamera) {\r\n            var camera = this._camera;\r\n            var zoomInv = 1 / camera.zoom;\r\n            var left = camera.left * zoomInv;\r\n            var right = camera.right * zoomInv;\r\n            var top_1 = camera.top * zoomInv;\r\n            var bottom = camera.bottom * zoomInv;\r\n            this._nearPlaneCorners[0].set(left, top_1, 0);\r\n            this._nearPlaneCorners[1].set(right, top_1, 0);\r\n            this._nearPlaneCorners[2].set(right, bottom, 0);\r\n            this._nearPlaneCorners[3].set(left, bottom, 0);\r\n        }\r\n    };\r\n    CameraControls.prototype._collisionTest = function () {\r\n        var distance = Infinity;\r\n        var hasCollider = this.colliderMeshes.length >= 1;\r\n        if (!hasCollider)\r\n            return distance;\r\n        if (notSupportedInOrthographicCamera(this._camera, '_collisionTest'))\r\n            return distance;\r\n        distance = this._spherical.radius;\r\n        var direction = _v3A.setFromSpherical(this._spherical).divideScalar(distance);\r\n        _rotationMatrix.lookAt(_ORIGIN, direction, this._camera.up);\r\n        for (var i = 0; i < 4; i++) {\r\n            var nearPlaneCorner = _v3B.copy(this._nearPlaneCorners[i]);\r\n            nearPlaneCorner.applyMatrix4(_rotationMatrix);\r\n            var origin_1 = _v3C.addVectors(this._target, nearPlaneCorner);\r\n            _raycaster.set(origin_1, direction);\r\n            _raycaster.far = distance;\r\n            var intersects = _raycaster.intersectObjects(this.colliderMeshes);\r\n            if (intersects.length !== 0 && intersects[0].distance < distance) {\r\n                distance = intersects[0].distance;\r\n            }\r\n        }\r\n        return distance;\r\n    };\r\n    CameraControls.prototype._getClientRect = function (target) {\r\n        var rect = this._domElement.getBoundingClientRect();\r\n        target.x = rect.left;\r\n        target.y = rect.top;\r\n        if (this._viewport) {\r\n            target.x += this._viewport.x;\r\n            target.y += rect.height - this._viewport.w - this._viewport.y;\r\n            target.z = this._viewport.z;\r\n            target.w = this._viewport.w;\r\n        }\r\n        else {\r\n            target.z = rect.width;\r\n            target.w = rect.height;\r\n        }\r\n        return target;\r\n    };\r\n    CameraControls.prototype._removeAllEventListeners = function () { };\r\n    return CameraControls;\r\n}(EventDispatcher));\r\nfunction createBoundingSphere(object3d, out) {\r\n    var boundingSphere = out;\r\n    var center = boundingSphere.center;\r\n    object3d.traverse(function (object) {\r\n        if (!object.isMesh)\r\n            return;\r\n        _box3A.expandByObject(object);\r\n    });\r\n    _box3A.getCenter(center);\r\n    var maxRadiusSq = 0;\r\n    object3d.traverse(function (object) {\r\n        if (!object.isMesh)\r\n            return;\r\n        var mesh = object;\r\n        var geometry = mesh.geometry.clone();\r\n        geometry.applyMatrix4(mesh.matrixWorld);\r\n        if (mesh.geometry.isBufferGeometry) {\r\n            var bufferGeometry = geometry;\r\n            var position = bufferGeometry.attributes.position;\r\n            for (var i = 0, l = position.count; i < l; i++) {\r\n                _v3A.fromBufferAttribute(position, i);\r\n                maxRadiusSq = Math.max(maxRadiusSq, center.distanceToSquared(_v3A));\r\n            }\r\n        }\r\n        else {\r\n            var vertices = geometry.vertices;\r\n            for (var i = 0, l = vertices.length; i < l; i++) {\r\n                maxRadiusSq = Math.max(maxRadiusSq, center.distanceToSquared(vertices[i]));\r\n            }\r\n        }\r\n    });\r\n    boundingSphere.radius = Math.sqrt(maxRadiusSq);\r\n    return boundingSphere;\r\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CameraControls);\n\n\n//# sourceURL=webpack://icosa/./node_modules/camera-controls/dist/camera-controls.module.js?");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/css/style.scss":
/*!*********************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/css/style.scss ***!
  \*********************************************************************************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.n, __webpack_exports__, __webpack_require__.r, module.id, __webpack_require__.d, __webpack_require__.*, module */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);\n// Imports\n\nvar ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});\n// Module\n___CSS_LOADER_EXPORT___.push([module.id, \"html, body {\\n  height: 100%;\\n  width: 100%;\\n  margin: 0;\\n}\\n\\n#icosa {\\n  margin: 0;\\n  width: 100%;\\n  height: 100%;\\n  position: relative;\\n  overflow: hidden;\\n  display: block;\\n}\\n\\n#c {\\n  width: 100%;\\n  height: 100%;\\n  display: block;\\n  position: static;\\n}\", \"\"]);\n// Exports\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);\n\n\n//# sourceURL=webpack://icosa/./src/css/style.scss?./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
/*! CommonJS bailout: module.exports is used directly at 9:0-14 */
/***/ ((module) => {

eval("\n\n/*\n  MIT License http://www.opensource.org/licenses/mit-license.php\n  Author Tobias Koppers @sokra\n*/\n// css base code, injected by the css-loader\n// eslint-disable-next-line func-names\nmodule.exports = function (cssWithMappingToString) {\n  var list = []; // return the list of modules as css string\n\n  list.toString = function toString() {\n    return this.map(function (item) {\n      var content = cssWithMappingToString(item);\n\n      if (item[2]) {\n        return \"@media \".concat(item[2], \" {\").concat(content, \"}\");\n      }\n\n      return content;\n    }).join('');\n  }; // import a list of modules into the list\n  // eslint-disable-next-line func-names\n\n\n  list.i = function (modules, mediaQuery, dedupe) {\n    if (typeof modules === 'string') {\n      // eslint-disable-next-line no-param-reassign\n      modules = [[null, modules, '']];\n    }\n\n    var alreadyImportedModules = {};\n\n    if (dedupe) {\n      for (var i = 0; i < this.length; i++) {\n        // eslint-disable-next-line prefer-destructuring\n        var id = this[i][0];\n\n        if (id != null) {\n          alreadyImportedModules[id] = true;\n        }\n      }\n    }\n\n    for (var _i = 0; _i < modules.length; _i++) {\n      var item = [].concat(modules[_i]);\n\n      if (dedupe && alreadyImportedModules[item[0]]) {\n        // eslint-disable-next-line no-continue\n        continue;\n      }\n\n      if (mediaQuery) {\n        if (!item[2]) {\n          item[2] = mediaQuery;\n        } else {\n          item[2] = \"\".concat(mediaQuery, \" and \").concat(item[2]);\n        }\n      }\n\n      list.push(item);\n    }\n  };\n\n  return list;\n};\n\n//# sourceURL=webpack://icosa/./node_modules/css-loader/dist/runtime/api.js?");

/***/ }),

/***/ "./src/css/style.scss":
/*!****************************!*\
  !*** ./src/css/style.scss ***!
  \****************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.n, __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ \"./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_style_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!../../node_modules/sass-loader/dist/cjs.js!./style.scss */ \"./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/css/style.scss\");\n\n            \n\nvar options = {};\n\noptions.insert = \"head\";\noptions.singleton = false;\n\nvar update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_style_scss__WEBPACK_IMPORTED_MODULE_1__.default, options);\n\n\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_style_scss__WEBPACK_IMPORTED_MODULE_1__.default.locals || {});\n\n//# sourceURL=webpack://icosa/./src/css/style.scss?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module, __webpack_require__.nc, __webpack_require__.* */
/*! CommonJS bailout: module.exports is used directly at 230:0-14 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\n\nvar isOldIE = function isOldIE() {\n  var memo;\n  return function memorize() {\n    if (typeof memo === 'undefined') {\n      // Test for IE <= 9 as proposed by Browserhacks\n      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805\n      // Tests for existence of standard globals is to allow style-loader\n      // to operate correctly into non-standard environments\n      // @see https://github.com/webpack-contrib/style-loader/issues/177\n      memo = Boolean(window && document && document.all && !window.atob);\n    }\n\n    return memo;\n  };\n}();\n\nvar getTarget = function getTarget() {\n  var memo = {};\n  return function memorize(target) {\n    if (typeof memo[target] === 'undefined') {\n      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself\n\n      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {\n        try {\n          // This will throw an exception if access to iframe is blocked\n          // due to cross-origin restrictions\n          styleTarget = styleTarget.contentDocument.head;\n        } catch (e) {\n          // istanbul ignore next\n          styleTarget = null;\n        }\n      }\n\n      memo[target] = styleTarget;\n    }\n\n    return memo[target];\n  };\n}();\n\nvar stylesInDom = [];\n\nfunction getIndexByIdentifier(identifier) {\n  var result = -1;\n\n  for (var i = 0; i < stylesInDom.length; i++) {\n    if (stylesInDom[i].identifier === identifier) {\n      result = i;\n      break;\n    }\n  }\n\n  return result;\n}\n\nfunction modulesToDom(list, options) {\n  var idCountMap = {};\n  var identifiers = [];\n\n  for (var i = 0; i < list.length; i++) {\n    var item = list[i];\n    var id = options.base ? item[0] + options.base : item[0];\n    var count = idCountMap[id] || 0;\n    var identifier = \"\".concat(id, \" \").concat(count);\n    idCountMap[id] = count + 1;\n    var index = getIndexByIdentifier(identifier);\n    var obj = {\n      css: item[1],\n      media: item[2],\n      sourceMap: item[3]\n    };\n\n    if (index !== -1) {\n      stylesInDom[index].references++;\n      stylesInDom[index].updater(obj);\n    } else {\n      stylesInDom.push({\n        identifier: identifier,\n        updater: addStyle(obj, options),\n        references: 1\n      });\n    }\n\n    identifiers.push(identifier);\n  }\n\n  return identifiers;\n}\n\nfunction insertStyleElement(options) {\n  var style = document.createElement('style');\n  var attributes = options.attributes || {};\n\n  if (typeof attributes.nonce === 'undefined') {\n    var nonce =  true ? __webpack_require__.nc : 0;\n\n    if (nonce) {\n      attributes.nonce = nonce;\n    }\n  }\n\n  Object.keys(attributes).forEach(function (key) {\n    style.setAttribute(key, attributes[key]);\n  });\n\n  if (typeof options.insert === 'function') {\n    options.insert(style);\n  } else {\n    var target = getTarget(options.insert || 'head');\n\n    if (!target) {\n      throw new Error(\"Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.\");\n    }\n\n    target.appendChild(style);\n  }\n\n  return style;\n}\n\nfunction removeStyleElement(style) {\n  // istanbul ignore if\n  if (style.parentNode === null) {\n    return false;\n  }\n\n  style.parentNode.removeChild(style);\n}\n/* istanbul ignore next  */\n\n\nvar replaceText = function replaceText() {\n  var textStore = [];\n  return function replace(index, replacement) {\n    textStore[index] = replacement;\n    return textStore.filter(Boolean).join('\\n');\n  };\n}();\n\nfunction applyToSingletonTag(style, index, remove, obj) {\n  var css = remove ? '' : obj.media ? \"@media \".concat(obj.media, \" {\").concat(obj.css, \"}\") : obj.css; // For old IE\n\n  /* istanbul ignore if  */\n\n  if (style.styleSheet) {\n    style.styleSheet.cssText = replaceText(index, css);\n  } else {\n    var cssNode = document.createTextNode(css);\n    var childNodes = style.childNodes;\n\n    if (childNodes[index]) {\n      style.removeChild(childNodes[index]);\n    }\n\n    if (childNodes.length) {\n      style.insertBefore(cssNode, childNodes[index]);\n    } else {\n      style.appendChild(cssNode);\n    }\n  }\n}\n\nfunction applyToTag(style, options, obj) {\n  var css = obj.css;\n  var media = obj.media;\n  var sourceMap = obj.sourceMap;\n\n  if (media) {\n    style.setAttribute('media', media);\n  } else {\n    style.removeAttribute('media');\n  }\n\n  if (sourceMap && typeof btoa !== 'undefined') {\n    css += \"\\n/*# sourceMappingURL=data:application/json;base64,\".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), \" */\");\n  } // For old IE\n\n  /* istanbul ignore if  */\n\n\n  if (style.styleSheet) {\n    style.styleSheet.cssText = css;\n  } else {\n    while (style.firstChild) {\n      style.removeChild(style.firstChild);\n    }\n\n    style.appendChild(document.createTextNode(css));\n  }\n}\n\nvar singleton = null;\nvar singletonCounter = 0;\n\nfunction addStyle(obj, options) {\n  var style;\n  var update;\n  var remove;\n\n  if (options.singleton) {\n    var styleIndex = singletonCounter++;\n    style = singleton || (singleton = insertStyleElement(options));\n    update = applyToSingletonTag.bind(null, style, styleIndex, false);\n    remove = applyToSingletonTag.bind(null, style, styleIndex, true);\n  } else {\n    style = insertStyleElement(options);\n    update = applyToTag.bind(null, style, options);\n\n    remove = function remove() {\n      removeStyleElement(style);\n    };\n  }\n\n  update(obj);\n  return function updateStyle(newObj) {\n    if (newObj) {\n      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {\n        return;\n      }\n\n      update(obj = newObj);\n    } else {\n      remove();\n    }\n  };\n}\n\nmodule.exports = function (list, options) {\n  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>\n  // tags it will allow on a page\n\n  if (!options.singleton && typeof options.singleton !== 'boolean') {\n    options.singleton = isOldIE();\n  }\n\n  list = list || [];\n  var lastIdentifiers = modulesToDom(list, options);\n  return function update(newList) {\n    newList = newList || [];\n\n    if (Object.prototype.toString.call(newList) !== '[object Array]') {\n      return;\n    }\n\n    for (var i = 0; i < lastIdentifiers.length; i++) {\n      var identifier = lastIdentifiers[i];\n      var index = getIndexByIdentifier(identifier);\n      stylesInDom[index].references--;\n    }\n\n    var newLastIdentifiers = modulesToDom(newList, options);\n\n    for (var _i = 0; _i < lastIdentifiers.length; _i++) {\n      var _identifier = lastIdentifiers[_i];\n\n      var _index = getIndexByIdentifier(_identifier);\n\n      if (stylesInDom[_index].references === 0) {\n        stylesInDom[_index].updater();\n\n        stylesInDom.splice(_index, 1);\n      }\n    }\n\n    lastIdentifiers = newLastIdentifiers;\n  };\n};\n\n//# sourceURL=webpack://icosa/./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js?");

/***/ }),

/***/ "./node_modules/three/build/three.module.js":
/*!**************************************************!*\
  !*** ./node_modules/three/build/three.module.js ***!
  \**************************************************/
/*! namespace exports */
/*! export ACESFilmicToneMapping [provided] [no usage info] [missing usage info prevents renaming] */
/*! export AddEquation [provided] [no usage info] [missing usage info prevents renaming] */
/*! export AddOperation [provided] [no usage info] [missing usage info prevents renaming] */
/*! export AdditiveAnimationBlendMode [provided] [no usage info] [missing usage info prevents renaming] */
/*! export AdditiveBlending [provided] [no usage info] [missing usage info prevents renaming] */
/*! export AlphaFormat [provided] [no usage info] [missing usage info prevents renaming] */
/*! export AlwaysDepth [provided] [no usage info] [missing usage info prevents renaming] */
/*! export AlwaysStencilFunc [provided] [no usage info] [missing usage info prevents renaming] */
/*! export AmbientLight [provided] [no usage info] [missing usage info prevents renaming] */
/*! export AmbientLightProbe [provided] [no usage info] [missing usage info prevents renaming] */
/*! export AnimationClip [provided] [no usage info] [missing usage info prevents renaming] */
/*! export AnimationLoader [provided] [no usage info] [missing usage info prevents renaming] */
/*! export AnimationMixer [provided] [no usage info] [missing usage info prevents renaming] */
/*! export AnimationObjectGroup [provided] [no usage info] [missing usage info prevents renaming] */
/*! export AnimationUtils [provided] [no usage info] [missing usage info prevents renaming] */
/*! export ArcCurve [provided] [no usage info] [missing usage info prevents renaming] */
/*! export ArrayCamera [provided] [no usage info] [missing usage info prevents renaming] */
/*! export ArrowHelper [provided] [no usage info] [missing usage info prevents renaming] */
/*! export Audio [provided] [no usage info] [missing usage info prevents renaming] */
/*! export AudioAnalyser [provided] [no usage info] [missing usage info prevents renaming] */
/*! export AudioContext [provided] [no usage info] [missing usage info prevents renaming] */
/*! export AudioListener [provided] [no usage info] [missing usage info prevents renaming] */
/*! export AudioLoader [provided] [no usage info] [missing usage info prevents renaming] */
/*! export AxesHelper [provided] [no usage info] [missing usage info prevents renaming] */
/*! export AxisHelper [provided] [no usage info] [missing usage info prevents renaming] */
/*! export BackSide [provided] [no usage info] [missing usage info prevents renaming] */
/*! export BasicDepthPacking [provided] [no usage info] [missing usage info prevents renaming] */
/*! export BasicShadowMap [provided] [no usage info] [missing usage info prevents renaming] */
/*! export BinaryTextureLoader [provided] [no usage info] [missing usage info prevents renaming] */
/*! export Bone [provided] [no usage info] [missing usage info prevents renaming] */
/*! export BooleanKeyframeTrack [provided] [no usage info] [missing usage info prevents renaming] */
/*! export BoundingBoxHelper [provided] [no usage info] [missing usage info prevents renaming] */
/*! export Box2 [provided] [no usage info] [missing usage info prevents renaming] */
/*! export Box3 [provided] [no usage info] [missing usage info prevents renaming] */
/*! export Box3Helper [provided] [no usage info] [missing usage info prevents renaming] */
/*! export BoxBufferGeometry [provided] [no usage info] [missing usage info prevents renaming] */
/*! export BoxGeometry [provided] [no usage info] [missing usage info prevents renaming] */
/*! export BoxHelper [provided] [no usage info] [missing usage info prevents renaming] */
/*! export BufferAttribute [provided] [no usage info] [missing usage info prevents renaming] */
/*! export BufferGeometry [provided] [no usage info] [missing usage info prevents renaming] */
/*! export BufferGeometryLoader [provided] [no usage info] [missing usage info prevents renaming] */
/*! export ByteType [provided] [no usage info] [missing usage info prevents renaming] */
/*! export Cache [provided] [no usage info] [missing usage info prevents renaming] */
/*! export Camera [provided] [no usage info] [missing usage info prevents renaming] */
/*! export CameraHelper [provided] [no usage info] [missing usage info prevents renaming] */
/*! export CanvasRenderer [provided] [no usage info] [missing usage info prevents renaming] */
/*! export CanvasTexture [provided] [no usage info] [missing usage info prevents renaming] */
/*! export CatmullRomCurve3 [provided] [no usage info] [missing usage info prevents renaming] */
/*! export CineonToneMapping [provided] [no usage info] [missing usage info prevents renaming] */
/*! export CircleBufferGeometry [provided] [no usage info] [missing usage info prevents renaming] */
/*! export CircleGeometry [provided] [no usage info] [missing usage info prevents renaming] */
/*! export ClampToEdgeWrapping [provided] [no usage info] [missing usage info prevents renaming] */
/*! export Clock [provided] [no usage info] [missing usage info prevents renaming] */
/*! export ClosedSplineCurve3 [provided] [no usage info] [missing usage info prevents renaming] */
/*! export Color [provided] [no usage info] [missing usage info prevents renaming] */
/*! export ColorKeyframeTrack [provided] [no usage info] [missing usage info prevents renaming] */
/*! export CompressedTexture [provided] [no usage info] [missing usage info prevents renaming] */
/*! export CompressedTextureLoader [provided] [no usage info] [missing usage info prevents renaming] */
/*! export ConeBufferGeometry [provided] [no usage info] [missing usage info prevents renaming] */
/*! export ConeGeometry [provided] [no usage info] [missing usage info prevents renaming] */
/*! export CubeCamera [provided] [no usage info] [missing usage info prevents renaming] */
/*! export CubeGeometry [provided] [no usage info] [missing usage info prevents renaming] */
/*! export CubeReflectionMapping [provided] [no usage info] [missing usage info prevents renaming] */
/*! export CubeRefractionMapping [provided] [no usage info] [missing usage info prevents renaming] */
/*! export CubeTexture [provided] [no usage info] [missing usage info prevents renaming] */
/*! export CubeTextureLoader [provided] [no usage info] [missing usage info prevents renaming] */
/*! export CubeUVReflectionMapping [provided] [no usage info] [missing usage info prevents renaming] */
/*! export CubeUVRefractionMapping [provided] [no usage info] [missing usage info prevents renaming] */
/*! export CubicBezierCurve [provided] [no usage info] [missing usage info prevents renaming] */
/*! export CubicBezierCurve3 [provided] [no usage info] [missing usage info prevents renaming] */
/*! export CubicInterpolant [provided] [no usage info] [missing usage info prevents renaming] */
/*! export CullFaceBack [provided] [no usage info] [missing usage info prevents renaming] */
/*! export CullFaceFront [provided] [no usage info] [missing usage info prevents renaming] */
/*! export CullFaceFrontBack [provided] [no usage info] [missing usage info prevents renaming] */
/*! export CullFaceNone [provided] [no usage info] [missing usage info prevents renaming] */
/*! export Curve [provided] [no usage info] [missing usage info prevents renaming] */
/*! export CurvePath [provided] [no usage info] [missing usage info prevents renaming] */
/*! export CustomBlending [provided] [no usage info] [missing usage info prevents renaming] */
/*! export CustomToneMapping [provided] [no usage info] [missing usage info prevents renaming] */
/*! export CylinderBufferGeometry [provided] [no usage info] [missing usage info prevents renaming] */
/*! export CylinderGeometry [provided] [no usage info] [missing usage info prevents renaming] */
/*! export Cylindrical [provided] [no usage info] [missing usage info prevents renaming] */
/*! export DataTexture [provided] [no usage info] [missing usage info prevents renaming] */
/*! export DataTexture2DArray [provided] [no usage info] [missing usage info prevents renaming] */
/*! export DataTexture3D [provided] [no usage info] [missing usage info prevents renaming] */
/*! export DataTextureLoader [provided] [no usage info] [missing usage info prevents renaming] */
/*! export DataUtils [provided] [no usage info] [missing usage info prevents renaming] */
/*! export DecrementStencilOp [provided] [no usage info] [missing usage info prevents renaming] */
/*! export DecrementWrapStencilOp [provided] [no usage info] [missing usage info prevents renaming] */
/*! export DefaultLoadingManager [provided] [no usage info] [missing usage info prevents renaming] */
/*! export DepthFormat [provided] [no usage info] [missing usage info prevents renaming] */
/*! export DepthStencilFormat [provided] [no usage info] [missing usage info prevents renaming] */
/*! export DepthTexture [provided] [no usage info] [missing usage info prevents renaming] */
/*! export DirectionalLight [provided] [no usage info] [missing usage info prevents renaming] */
/*! export DirectionalLightHelper [provided] [no usage info] [missing usage info prevents renaming] */
/*! export DiscreteInterpolant [provided] [no usage info] [missing usage info prevents renaming] */
/*! export DodecahedronBufferGeometry [provided] [no usage info] [missing usage info prevents renaming] */
/*! export DodecahedronGeometry [provided] [no usage info] [missing usage info prevents renaming] */
/*! export DoubleSide [provided] [no usage info] [missing usage info prevents renaming] */
/*! export DstAlphaFactor [provided] [no usage info] [missing usage info prevents renaming] */
/*! export DstColorFactor [provided] [no usage info] [missing usage info prevents renaming] */
/*! export DynamicBufferAttribute [provided] [no usage info] [missing usage info prevents renaming] */
/*! export DynamicCopyUsage [provided] [no usage info] [missing usage info prevents renaming] */
/*! export DynamicDrawUsage [provided] [no usage info] [missing usage info prevents renaming] */
/*! export DynamicReadUsage [provided] [no usage info] [missing usage info prevents renaming] */
/*! export EdgesGeometry [provided] [no usage info] [missing usage info prevents renaming] */
/*! export EdgesHelper [provided] [no usage info] [missing usage info prevents renaming] */
/*! export EllipseCurve [provided] [no usage info] [missing usage info prevents renaming] */
/*! export EqualDepth [provided] [no usage info] [missing usage info prevents renaming] */
/*! export EqualStencilFunc [provided] [no usage info] [missing usage info prevents renaming] */
/*! export EquirectangularReflectionMapping [provided] [no usage info] [missing usage info prevents renaming] */
/*! export EquirectangularRefractionMapping [provided] [no usage info] [missing usage info prevents renaming] */
/*! export Euler [provided] [no usage info] [missing usage info prevents renaming] */
/*! export EventDispatcher [provided] [no usage info] [missing usage info prevents renaming] */
/*! export ExtrudeBufferGeometry [provided] [no usage info] [missing usage info prevents renaming] */
/*! export ExtrudeGeometry [provided] [no usage info] [missing usage info prevents renaming] */
/*! export Face3 [provided] [no usage info] [missing usage info prevents renaming] */
/*! export Face4 [provided] [no usage info] [missing usage info prevents renaming] */
/*! export FaceColors [provided] [no usage info] [missing usage info prevents renaming] */
/*! export FileLoader [provided] [no usage info] [missing usage info prevents renaming] */
/*! export FlatShading [provided] [no usage info] [missing usage info prevents renaming] */
/*! export Float16BufferAttribute [provided] [no usage info] [missing usage info prevents renaming] */
/*! export Float32Attribute [provided] [no usage info] [missing usage info prevents renaming] */
/*! export Float32BufferAttribute [provided] [no usage info] [missing usage info prevents renaming] */
/*! export Float64Attribute [provided] [no usage info] [missing usage info prevents renaming] */
/*! export Float64BufferAttribute [provided] [no usage info] [missing usage info prevents renaming] */
/*! export FloatType [provided] [no usage info] [missing usage info prevents renaming] */
/*! export Fog [provided] [no usage info] [missing usage info prevents renaming] */
/*! export FogExp2 [provided] [no usage info] [missing usage info prevents renaming] */
/*! export Font [provided] [no usage info] [missing usage info prevents renaming] */
/*! export FontLoader [provided] [no usage info] [missing usage info prevents renaming] */
/*! export FrontSide [provided] [no usage info] [missing usage info prevents renaming] */
/*! export Frustum [provided] [no usage info] [missing usage info prevents renaming] */
/*! export GLBufferAttribute [provided] [no usage info] [missing usage info prevents renaming] */
/*! export GLSL1 [provided] [no usage info] [missing usage info prevents renaming] */
/*! export GLSL3 [provided] [no usage info] [missing usage info prevents renaming] */
/*! export GammaEncoding [provided] [no usage info] [missing usage info prevents renaming] */
/*! export Geometry [provided] [no usage info] [missing usage info prevents renaming] */
/*! export GeometryUtils [provided] [no usage info] [missing usage info prevents renaming] */
/*! export GreaterDepth [provided] [no usage info] [missing usage info prevents renaming] */
/*! export GreaterEqualDepth [provided] [no usage info] [missing usage info prevents renaming] */
/*! export GreaterEqualStencilFunc [provided] [no usage info] [missing usage info prevents renaming] */
/*! export GreaterStencilFunc [provided] [no usage info] [missing usage info prevents renaming] */
/*! export GridHelper [provided] [no usage info] [missing usage info prevents renaming] */
/*! export Group [provided] [no usage info] [missing usage info prevents renaming] */
/*! export HalfFloatType [provided] [no usage info] [missing usage info prevents renaming] */
/*! export HemisphereLight [provided] [no usage info] [missing usage info prevents renaming] */
/*! export HemisphereLightHelper [provided] [no usage info] [missing usage info prevents renaming] */
/*! export HemisphereLightProbe [provided] [no usage info] [missing usage info prevents renaming] */
/*! export IcosahedronBufferGeometry [provided] [no usage info] [missing usage info prevents renaming] */
/*! export IcosahedronGeometry [provided] [no usage info] [missing usage info prevents renaming] */
/*! export ImageBitmapLoader [provided] [no usage info] [missing usage info prevents renaming] */
/*! export ImageLoader [provided] [no usage info] [missing usage info prevents renaming] */
/*! export ImageUtils [provided] [no usage info] [missing usage info prevents renaming] */
/*! export ImmediateRenderObject [provided] [no usage info] [missing usage info prevents renaming] */
/*! export IncrementStencilOp [provided] [no usage info] [missing usage info prevents renaming] */
/*! export IncrementWrapStencilOp [provided] [no usage info] [missing usage info prevents renaming] */
/*! export InstancedBufferAttribute [provided] [no usage info] [missing usage info prevents renaming] */
/*! export InstancedBufferGeometry [provided] [no usage info] [missing usage info prevents renaming] */
/*! export InstancedInterleavedBuffer [provided] [no usage info] [missing usage info prevents renaming] */
/*! export InstancedMesh [provided] [no usage info] [missing usage info prevents renaming] */
/*! export Int16Attribute [provided] [no usage info] [missing usage info prevents renaming] */
/*! export Int16BufferAttribute [provided] [no usage info] [missing usage info prevents renaming] */
/*! export Int32Attribute [provided] [no usage info] [missing usage info prevents renaming] */
/*! export Int32BufferAttribute [provided] [no usage info] [missing usage info prevents renaming] */
/*! export Int8Attribute [provided] [no usage info] [missing usage info prevents renaming] */
/*! export Int8BufferAttribute [provided] [no usage info] [missing usage info prevents renaming] */
/*! export IntType [provided] [no usage info] [missing usage info prevents renaming] */
/*! export InterleavedBuffer [provided] [no usage info] [missing usage info prevents renaming] */
/*! export InterleavedBufferAttribute [provided] [no usage info] [missing usage info prevents renaming] */
/*! export Interpolant [provided] [no usage info] [missing usage info prevents renaming] */
/*! export InterpolateDiscrete [provided] [no usage info] [missing usage info prevents renaming] */
/*! export InterpolateLinear [provided] [no usage info] [missing usage info prevents renaming] */
/*! export InterpolateSmooth [provided] [no usage info] [missing usage info prevents renaming] */
/*! export InvertStencilOp [provided] [no usage info] [missing usage info prevents renaming] */
/*! export JSONLoader [provided] [no usage info] [missing usage info prevents renaming] */
/*! export KeepStencilOp [provided] [no usage info] [missing usage info prevents renaming] */
/*! export KeyframeTrack [provided] [no usage info] [missing usage info prevents renaming] */
/*! export LOD [provided] [no usage info] [missing usage info prevents renaming] */
/*! export LatheBufferGeometry [provided] [no usage info] [missing usage info prevents renaming] */
/*! export LatheGeometry [provided] [no usage info] [missing usage info prevents renaming] */
/*! export Layers [provided] [no usage info] [missing usage info prevents renaming] */
/*! export LensFlare [provided] [no usage info] [missing usage info prevents renaming] */
/*! export LessDepth [provided] [no usage info] [missing usage info prevents renaming] */
/*! export LessEqualDepth [provided] [no usage info] [missing usage info prevents renaming] */
/*! export LessEqualStencilFunc [provided] [no usage info] [missing usage info prevents renaming] */
/*! export LessStencilFunc [provided] [no usage info] [missing usage info prevents renaming] */
/*! export Light [provided] [no usage info] [missing usage info prevents renaming] */
/*! export LightProbe [provided] [no usage info] [missing usage info prevents renaming] */
/*! export Line [provided] [no usage info] [missing usage info prevents renaming] */
/*! export Line3 [provided] [no usage info] [missing usage info prevents renaming] */
/*! export LineBasicMaterial [provided] [no usage info] [missing usage info prevents renaming] */
/*! export LineCurve [provided] [no usage info] [missing usage info prevents renaming] */
/*! export LineCurve3 [provided] [no usage info] [missing usage info prevents renaming] */
/*! export LineDashedMaterial [provided] [no usage info] [missing usage info prevents renaming] */
/*! export LineLoop [provided] [no usage info] [missing usage info prevents renaming] */
/*! export LinePieces [provided] [no usage info] [missing usage info prevents renaming] */
/*! export LineSegments [provided] [no usage info] [missing usage info prevents renaming] */
/*! export LineStrip [provided] [no usage info] [missing usage info prevents renaming] */
/*! export LinearEncoding [provided] [no usage info] [missing usage info prevents renaming] */
/*! export LinearFilter [provided] [no usage info] [missing usage info prevents renaming] */
/*! export LinearInterpolant [provided] [no usage info] [missing usage info prevents renaming] */
/*! export LinearMipMapLinearFilter [provided] [no usage info] [missing usage info prevents renaming] */
/*! export LinearMipMapNearestFilter [provided] [no usage info] [missing usage info prevents renaming] */
/*! export LinearMipmapLinearFilter [provided] [no usage info] [missing usage info prevents renaming] */
/*! export LinearMipmapNearestFilter [provided] [no usage info] [missing usage info prevents renaming] */
/*! export LinearToneMapping [provided] [no usage info] [missing usage info prevents renaming] */
/*! export Loader [provided] [no usage info] [missing usage info prevents renaming] */
/*! export LoaderUtils [provided] [no usage info] [missing usage info prevents renaming] */
/*! export LoadingManager [provided] [no usage info] [missing usage info prevents renaming] */
/*! export LogLuvEncoding [provided] [no usage info] [missing usage info prevents renaming] */
/*! export LoopOnce [provided] [no usage info] [missing usage info prevents renaming] */
/*! export LoopPingPong [provided] [no usage info] [missing usage info prevents renaming] */
/*! export LoopRepeat [provided] [no usage info] [missing usage info prevents renaming] */
/*! export LuminanceAlphaFormat [provided] [no usage info] [missing usage info prevents renaming] */
/*! export LuminanceFormat [provided] [no usage info] [missing usage info prevents renaming] */
/*! export MOUSE [provided] [no usage info] [missing usage info prevents renaming] */
/*! export Material [provided] [no usage info] [missing usage info prevents renaming] */
/*! export MaterialLoader [provided] [no usage info] [missing usage info prevents renaming] */
/*! export Math [provided] [no usage info] [missing usage info prevents renaming] */
/*! export MathUtils [provided] [no usage info] [missing usage info prevents renaming] */
/*! export Matrix3 [provided] [no usage info] [missing usage info prevents renaming] */
/*! export Matrix4 [provided] [no usage info] [missing usage info prevents renaming] */
/*! export MaxEquation [provided] [no usage info] [missing usage info prevents renaming] */
/*! export Mesh [provided] [no usage info] [missing usage info prevents renaming] */
/*! export MeshBasicMaterial [provided] [no usage info] [missing usage info prevents renaming] */
/*! export MeshDepthMaterial [provided] [no usage info] [missing usage info prevents renaming] */
/*! export MeshDistanceMaterial [provided] [no usage info] [missing usage info prevents renaming] */
/*! export MeshFaceMaterial [provided] [no usage info] [missing usage info prevents renaming] */
/*! export MeshLambertMaterial [provided] [no usage info] [missing usage info prevents renaming] */
/*! export MeshMatcapMaterial [provided] [no usage info] [missing usage info prevents renaming] */
/*! export MeshNormalMaterial [provided] [no usage info] [missing usage info prevents renaming] */
/*! export MeshPhongMaterial [provided] [no usage info] [missing usage info prevents renaming] */
/*! export MeshPhysicalMaterial [provided] [no usage info] [missing usage info prevents renaming] */
/*! export MeshStandardMaterial [provided] [no usage info] [missing usage info prevents renaming] */
/*! export MeshToonMaterial [provided] [no usage info] [missing usage info prevents renaming] */
/*! export MinEquation [provided] [no usage info] [missing usage info prevents renaming] */
/*! export MirroredRepeatWrapping [provided] [no usage info] [missing usage info prevents renaming] */
/*! export MixOperation [provided] [no usage info] [missing usage info prevents renaming] */
/*! export MultiMaterial [provided] [no usage info] [missing usage info prevents renaming] */
/*! export MultiplyBlending [provided] [no usage info] [missing usage info prevents renaming] */
/*! export MultiplyOperation [provided] [no usage info] [missing usage info prevents renaming] */
/*! export NearestFilter [provided] [no usage info] [missing usage info prevents renaming] */
/*! export NearestMipMapLinearFilter [provided] [no usage info] [missing usage info prevents renaming] */
/*! export NearestMipMapNearestFilter [provided] [no usage info] [missing usage info prevents renaming] */
/*! export NearestMipmapLinearFilter [provided] [no usage info] [missing usage info prevents renaming] */
/*! export NearestMipmapNearestFilter [provided] [no usage info] [missing usage info prevents renaming] */
/*! export NeverDepth [provided] [no usage info] [missing usage info prevents renaming] */
/*! export NeverStencilFunc [provided] [no usage info] [missing usage info prevents renaming] */
/*! export NoBlending [provided] [no usage info] [missing usage info prevents renaming] */
/*! export NoColors [provided] [no usage info] [missing usage info prevents renaming] */
/*! export NoToneMapping [provided] [no usage info] [missing usage info prevents renaming] */
/*! export NormalAnimationBlendMode [provided] [no usage info] [missing usage info prevents renaming] */
/*! export NormalBlending [provided] [no usage info] [missing usage info prevents renaming] */
/*! export NotEqualDepth [provided] [no usage info] [missing usage info prevents renaming] */
/*! export NotEqualStencilFunc [provided] [no usage info] [missing usage info prevents renaming] */
/*! export NumberKeyframeTrack [provided] [no usage info] [missing usage info prevents renaming] */
/*! export Object3D [provided] [no usage info] [missing usage info prevents renaming] */
/*! export ObjectLoader [provided] [no usage info] [missing usage info prevents renaming] */
/*! export ObjectSpaceNormalMap [provided] [no usage info] [missing usage info prevents renaming] */
/*! export OctahedronBufferGeometry [provided] [no usage info] [missing usage info prevents renaming] */
/*! export OctahedronGeometry [provided] [no usage info] [missing usage info prevents renaming] */
/*! export OneFactor [provided] [no usage info] [missing usage info prevents renaming] */
/*! export OneMinusDstAlphaFactor [provided] [no usage info] [missing usage info prevents renaming] */
/*! export OneMinusDstColorFactor [provided] [no usage info] [missing usage info prevents renaming] */
/*! export OneMinusSrcAlphaFactor [provided] [no usage info] [missing usage info prevents renaming] */
/*! export OneMinusSrcColorFactor [provided] [no usage info] [missing usage info prevents renaming] */
/*! export OrthographicCamera [provided] [no usage info] [missing usage info prevents renaming] */
/*! export PCFShadowMap [provided] [no usage info] [missing usage info prevents renaming] */
/*! export PCFSoftShadowMap [provided] [no usage info] [missing usage info prevents renaming] */
/*! export PMREMGenerator [provided] [no usage info] [missing usage info prevents renaming] */
/*! export ParametricBufferGeometry [provided] [no usage info] [missing usage info prevents renaming] */
/*! export ParametricGeometry [provided] [no usage info] [missing usage info prevents renaming] */
/*! export Particle [provided] [no usage info] [missing usage info prevents renaming] */
/*! export ParticleBasicMaterial [provided] [no usage info] [missing usage info prevents renaming] */
/*! export ParticleSystem [provided] [no usage info] [missing usage info prevents renaming] */
/*! export ParticleSystemMaterial [provided] [no usage info] [missing usage info prevents renaming] */
/*! export Path [provided] [no usage info] [missing usage info prevents renaming] */
/*! export PerspectiveCamera [provided] [no usage info] [missing usage info prevents renaming] */
/*! export Plane [provided] [no usage info] [missing usage info prevents renaming] */
/*! export PlaneBufferGeometry [provided] [no usage info] [missing usage info prevents renaming] */
/*! export PlaneGeometry [provided] [no usage info] [missing usage info prevents renaming] */
/*! export PlaneHelper [provided] [no usage info] [missing usage info prevents renaming] */
/*! export PointCloud [provided] [no usage info] [missing usage info prevents renaming] */
/*! export PointCloudMaterial [provided] [no usage info] [missing usage info prevents renaming] */
/*! export PointLight [provided] [no usage info] [missing usage info prevents renaming] */
/*! export PointLightHelper [provided] [no usage info] [missing usage info prevents renaming] */
/*! export Points [provided] [no usage info] [missing usage info prevents renaming] */
/*! export PointsMaterial [provided] [no usage info] [missing usage info prevents renaming] */
/*! export PolarGridHelper [provided] [no usage info] [missing usage info prevents renaming] */
/*! export PolyhedronBufferGeometry [provided] [no usage info] [missing usage info prevents renaming] */
/*! export PolyhedronGeometry [provided] [no usage info] [missing usage info prevents renaming] */
/*! export PositionalAudio [provided] [no usage info] [missing usage info prevents renaming] */
/*! export PropertyBinding [provided] [no usage info] [missing usage info prevents renaming] */
/*! export PropertyMixer [provided] [no usage info] [missing usage info prevents renaming] */
/*! export QuadraticBezierCurve [provided] [no usage info] [missing usage info prevents renaming] */
/*! export QuadraticBezierCurve3 [provided] [no usage info] [missing usage info prevents renaming] */
/*! export Quaternion [provided] [no usage info] [missing usage info prevents renaming] */
/*! export QuaternionKeyframeTrack [provided] [no usage info] [missing usage info prevents renaming] */
/*! export QuaternionLinearInterpolant [provided] [no usage info] [missing usage info prevents renaming] */
/*! export REVISION [provided] [no usage info] [missing usage info prevents renaming] */
/*! export RGBADepthPacking [provided] [no usage info] [missing usage info prevents renaming] */
/*! export RGBAFormat [provided] [no usage info] [missing usage info prevents renaming] */
/*! export RGBAIntegerFormat [provided] [no usage info] [missing usage info prevents renaming] */
/*! export RGBA_ASTC_10x10_Format [provided] [no usage info] [missing usage info prevents renaming] */
/*! export RGBA_ASTC_10x5_Format [provided] [no usage info] [missing usage info prevents renaming] */
/*! export RGBA_ASTC_10x6_Format [provided] [no usage info] [missing usage info prevents renaming] */
/*! export RGBA_ASTC_10x8_Format [provided] [no usage info] [missing usage info prevents renaming] */
/*! export RGBA_ASTC_12x10_Format [provided] [no usage info] [missing usage info prevents renaming] */
/*! export RGBA_ASTC_12x12_Format [provided] [no usage info] [missing usage info prevents renaming] */
/*! export RGBA_ASTC_4x4_Format [provided] [no usage info] [missing usage info prevents renaming] */
/*! export RGBA_ASTC_5x4_Format [provided] [no usage info] [missing usage info prevents renaming] */
/*! export RGBA_ASTC_5x5_Format [provided] [no usage info] [missing usage info prevents renaming] */
/*! export RGBA_ASTC_6x5_Format [provided] [no usage info] [missing usage info prevents renaming] */
/*! export RGBA_ASTC_6x6_Format [provided] [no usage info] [missing usage info prevents renaming] */
/*! export RGBA_ASTC_8x5_Format [provided] [no usage info] [missing usage info prevents renaming] */
/*! export RGBA_ASTC_8x6_Format [provided] [no usage info] [missing usage info prevents renaming] */
/*! export RGBA_ASTC_8x8_Format [provided] [no usage info] [missing usage info prevents renaming] */
/*! export RGBA_BPTC_Format [provided] [no usage info] [missing usage info prevents renaming] */
/*! export RGBA_ETC2_EAC_Format [provided] [no usage info] [missing usage info prevents renaming] */
/*! export RGBA_PVRTC_2BPPV1_Format [provided] [no usage info] [missing usage info prevents renaming] */
/*! export RGBA_PVRTC_4BPPV1_Format [provided] [no usage info] [missing usage info prevents renaming] */
/*! export RGBA_S3TC_DXT1_Format [provided] [no usage info] [missing usage info prevents renaming] */
/*! export RGBA_S3TC_DXT3_Format [provided] [no usage info] [missing usage info prevents renaming] */
/*! export RGBA_S3TC_DXT5_Format [provided] [no usage info] [missing usage info prevents renaming] */
/*! export RGBDEncoding [provided] [no usage info] [missing usage info prevents renaming] */
/*! export RGBEEncoding [provided] [no usage info] [missing usage info prevents renaming] */
/*! export RGBEFormat [provided] [no usage info] [missing usage info prevents renaming] */
/*! export RGBFormat [provided] [no usage info] [missing usage info prevents renaming] */
/*! export RGBIntegerFormat [provided] [no usage info] [missing usage info prevents renaming] */
/*! export RGBM16Encoding [provided] [no usage info] [missing usage info prevents renaming] */
/*! export RGBM7Encoding [provided] [no usage info] [missing usage info prevents renaming] */
/*! export RGB_ETC1_Format [provided] [no usage info] [missing usage info prevents renaming] */
/*! export RGB_ETC2_Format [provided] [no usage info] [missing usage info prevents renaming] */
/*! export RGB_PVRTC_2BPPV1_Format [provided] [no usage info] [missing usage info prevents renaming] */
/*! export RGB_PVRTC_4BPPV1_Format [provided] [no usage info] [missing usage info prevents renaming] */
/*! export RGB_S3TC_DXT1_Format [provided] [no usage info] [missing usage info prevents renaming] */
/*! export RGFormat [provided] [no usage info] [missing usage info prevents renaming] */
/*! export RGIntegerFormat [provided] [no usage info] [missing usage info prevents renaming] */
/*! export RawShaderMaterial [provided] [no usage info] [missing usage info prevents renaming] */
/*! export Ray [provided] [no usage info] [missing usage info prevents renaming] */
/*! export Raycaster [provided] [no usage info] [missing usage info prevents renaming] */
/*! export RectAreaLight [provided] [no usage info] [missing usage info prevents renaming] */
/*! export RedFormat [provided] [no usage info] [missing usage info prevents renaming] */
/*! export RedIntegerFormat [provided] [no usage info] [missing usage info prevents renaming] */
/*! export ReinhardToneMapping [provided] [no usage info] [missing usage info prevents renaming] */
/*! export RepeatWrapping [provided] [no usage info] [missing usage info prevents renaming] */
/*! export ReplaceStencilOp [provided] [no usage info] [missing usage info prevents renaming] */
/*! export ReverseSubtractEquation [provided] [no usage info] [missing usage info prevents renaming] */
/*! export RingBufferGeometry [provided] [no usage info] [missing usage info prevents renaming] */
/*! export RingGeometry [provided] [no usage info] [missing usage info prevents renaming] */
/*! export SRGB8_ALPHA8_ASTC_10x10_Format [provided] [no usage info] [missing usage info prevents renaming] */
/*! export SRGB8_ALPHA8_ASTC_10x5_Format [provided] [no usage info] [missing usage info prevents renaming] */
/*! export SRGB8_ALPHA8_ASTC_10x6_Format [provided] [no usage info] [missing usage info prevents renaming] */
/*! export SRGB8_ALPHA8_ASTC_10x8_Format [provided] [no usage info] [missing usage info prevents renaming] */
/*! export SRGB8_ALPHA8_ASTC_12x10_Format [provided] [no usage info] [missing usage info prevents renaming] */
/*! export SRGB8_ALPHA8_ASTC_12x12_Format [provided] [no usage info] [missing usage info prevents renaming] */
/*! export SRGB8_ALPHA8_ASTC_4x4_Format [provided] [no usage info] [missing usage info prevents renaming] */
/*! export SRGB8_ALPHA8_ASTC_5x4_Format [provided] [no usage info] [missing usage info prevents renaming] */
/*! export SRGB8_ALPHA8_ASTC_5x5_Format [provided] [no usage info] [missing usage info prevents renaming] */
/*! export SRGB8_ALPHA8_ASTC_6x5_Format [provided] [no usage info] [missing usage info prevents renaming] */
/*! export SRGB8_ALPHA8_ASTC_6x6_Format [provided] [no usage info] [missing usage info prevents renaming] */
/*! export SRGB8_ALPHA8_ASTC_8x5_Format [provided] [no usage info] [missing usage info prevents renaming] */
/*! export SRGB8_ALPHA8_ASTC_8x6_Format [provided] [no usage info] [missing usage info prevents renaming] */
/*! export SRGB8_ALPHA8_ASTC_8x8_Format [provided] [no usage info] [missing usage info prevents renaming] */
/*! export Scene [provided] [no usage info] [missing usage info prevents renaming] */
/*! export SceneUtils [provided] [no usage info] [missing usage info prevents renaming] */
/*! export ShaderChunk [provided] [no usage info] [missing usage info prevents renaming] */
/*! export ShaderLib [provided] [no usage info] [missing usage info prevents renaming] */
/*! export ShaderMaterial [provided] [no usage info] [missing usage info prevents renaming] */
/*! export ShadowMaterial [provided] [no usage info] [missing usage info prevents renaming] */
/*! export Shape [provided] [no usage info] [missing usage info prevents renaming] */
/*! export ShapeBufferGeometry [provided] [no usage info] [missing usage info prevents renaming] */
/*! export ShapeGeometry [provided] [no usage info] [missing usage info prevents renaming] */
/*! export ShapePath [provided] [no usage info] [missing usage info prevents renaming] */
/*! export ShapeUtils [provided] [no usage info] [missing usage info prevents renaming] */
/*! export ShortType [provided] [no usage info] [missing usage info prevents renaming] */
/*! export Skeleton [provided] [no usage info] [missing usage info prevents renaming] */
/*! export SkeletonHelper [provided] [no usage info] [missing usage info prevents renaming] */
/*! export SkinnedMesh [provided] [no usage info] [missing usage info prevents renaming] */
/*! export SmoothShading [provided] [no usage info] [missing usage info prevents renaming] */
/*! export Sphere [provided] [no usage info] [missing usage info prevents renaming] */
/*! export SphereBufferGeometry [provided] [no usage info] [missing usage info prevents renaming] */
/*! export SphereGeometry [provided] [no usage info] [missing usage info prevents renaming] */
/*! export Spherical [provided] [no usage info] [missing usage info prevents renaming] */
/*! export SphericalHarmonics3 [provided] [no usage info] [missing usage info prevents renaming] */
/*! export Spline [provided] [no usage info] [missing usage info prevents renaming] */
/*! export SplineCurve [provided] [no usage info] [missing usage info prevents renaming] */
/*! export SplineCurve3 [provided] [no usage info] [missing usage info prevents renaming] */
/*! export SpotLight [provided] [no usage info] [missing usage info prevents renaming] */
/*! export SpotLightHelper [provided] [no usage info] [missing usage info prevents renaming] */
/*! export Sprite [provided] [no usage info] [missing usage info prevents renaming] */
/*! export SpriteMaterial [provided] [no usage info] [missing usage info prevents renaming] */
/*! export SrcAlphaFactor [provided] [no usage info] [missing usage info prevents renaming] */
/*! export SrcAlphaSaturateFactor [provided] [no usage info] [missing usage info prevents renaming] */
/*! export SrcColorFactor [provided] [no usage info] [missing usage info prevents renaming] */
/*! export StaticCopyUsage [provided] [no usage info] [missing usage info prevents renaming] */
/*! export StaticDrawUsage [provided] [no usage info] [missing usage info prevents renaming] */
/*! export StaticReadUsage [provided] [no usage info] [missing usage info prevents renaming] */
/*! export StereoCamera [provided] [no usage info] [missing usage info prevents renaming] */
/*! export StreamCopyUsage [provided] [no usage info] [missing usage info prevents renaming] */
/*! export StreamDrawUsage [provided] [no usage info] [missing usage info prevents renaming] */
/*! export StreamReadUsage [provided] [no usage info] [missing usage info prevents renaming] */
/*! export StringKeyframeTrack [provided] [no usage info] [missing usage info prevents renaming] */
/*! export SubtractEquation [provided] [no usage info] [missing usage info prevents renaming] */
/*! export SubtractiveBlending [provided] [no usage info] [missing usage info prevents renaming] */
/*! export TOUCH [provided] [no usage info] [missing usage info prevents renaming] */
/*! export TangentSpaceNormalMap [provided] [no usage info] [missing usage info prevents renaming] */
/*! export TetrahedronBufferGeometry [provided] [no usage info] [missing usage info prevents renaming] */
/*! export TetrahedronGeometry [provided] [no usage info] [missing usage info prevents renaming] */
/*! export TextBufferGeometry [provided] [no usage info] [missing usage info prevents renaming] */
/*! export TextGeometry [provided] [no usage info] [missing usage info prevents renaming] */
/*! export Texture [provided] [no usage info] [missing usage info prevents renaming] */
/*! export TextureLoader [provided] [no usage info] [missing usage info prevents renaming] */
/*! export TorusBufferGeometry [provided] [no usage info] [missing usage info prevents renaming] */
/*! export TorusGeometry [provided] [no usage info] [missing usage info prevents renaming] */
/*! export TorusKnotBufferGeometry [provided] [no usage info] [missing usage info prevents renaming] */
/*! export TorusKnotGeometry [provided] [no usage info] [missing usage info prevents renaming] */
/*! export Triangle [provided] [no usage info] [missing usage info prevents renaming] */
/*! export TriangleFanDrawMode [provided] [no usage info] [missing usage info prevents renaming] */
/*! export TriangleStripDrawMode [provided] [no usage info] [missing usage info prevents renaming] */
/*! export TrianglesDrawMode [provided] [no usage info] [missing usage info prevents renaming] */
/*! export TubeBufferGeometry [provided] [no usage info] [missing usage info prevents renaming] */
/*! export TubeGeometry [provided] [no usage info] [missing usage info prevents renaming] */
/*! export UVMapping [provided] [no usage info] [missing usage info prevents renaming] */
/*! export Uint16Attribute [provided] [no usage info] [missing usage info prevents renaming] */
/*! export Uint16BufferAttribute [provided] [no usage info] [missing usage info prevents renaming] */
/*! export Uint32Attribute [provided] [no usage info] [missing usage info prevents renaming] */
/*! export Uint32BufferAttribute [provided] [no usage info] [missing usage info prevents renaming] */
/*! export Uint8Attribute [provided] [no usage info] [missing usage info prevents renaming] */
/*! export Uint8BufferAttribute [provided] [no usage info] [missing usage info prevents renaming] */
/*! export Uint8ClampedAttribute [provided] [no usage info] [missing usage info prevents renaming] */
/*! export Uint8ClampedBufferAttribute [provided] [no usage info] [missing usage info prevents renaming] */
/*! export Uniform [provided] [no usage info] [missing usage info prevents renaming] */
/*! export UniformsLib [provided] [no usage info] [missing usage info prevents renaming] */
/*! export UniformsUtils [provided] [no usage info] [missing usage info prevents renaming] */
/*! export UnsignedByteType [provided] [no usage info] [missing usage info prevents renaming] */
/*! export UnsignedInt248Type [provided] [no usage info] [missing usage info prevents renaming] */
/*! export UnsignedIntType [provided] [no usage info] [missing usage info prevents renaming] */
/*! export UnsignedShort4444Type [provided] [no usage info] [missing usage info prevents renaming] */
/*! export UnsignedShort5551Type [provided] [no usage info] [missing usage info prevents renaming] */
/*! export UnsignedShort565Type [provided] [no usage info] [missing usage info prevents renaming] */
/*! export UnsignedShortType [provided] [no usage info] [missing usage info prevents renaming] */
/*! export VSMShadowMap [provided] [no usage info] [missing usage info prevents renaming] */
/*! export Vector2 [provided] [no usage info] [missing usage info prevents renaming] */
/*! export Vector3 [provided] [no usage info] [missing usage info prevents renaming] */
/*! export Vector4 [provided] [no usage info] [missing usage info prevents renaming] */
/*! export VectorKeyframeTrack [provided] [no usage info] [missing usage info prevents renaming] */
/*! export Vertex [provided] [no usage info] [missing usage info prevents renaming] */
/*! export VertexColors [provided] [no usage info] [missing usage info prevents renaming] */
/*! export VideoTexture [provided] [no usage info] [missing usage info prevents renaming] */
/*! export WebGL1Renderer [provided] [no usage info] [missing usage info prevents renaming] */
/*! export WebGLCubeRenderTarget [provided] [no usage info] [missing usage info prevents renaming] */
/*! export WebGLMultisampleRenderTarget [provided] [no usage info] [missing usage info prevents renaming] */
/*! export WebGLRenderTarget [provided] [no usage info] [missing usage info prevents renaming] */
/*! export WebGLRenderTargetCube [provided] [no usage info] [missing usage info prevents renaming] */
/*! export WebGLRenderer [provided] [no usage info] [missing usage info prevents renaming] */
/*! export WebGLUtils [provided] [no usage info] [missing usage info prevents renaming] */
/*! export WireframeGeometry [provided] [no usage info] [missing usage info prevents renaming] */
/*! export WireframeHelper [provided] [no usage info] [missing usage info prevents renaming] */
/*! export WrapAroundEnding [provided] [no usage info] [missing usage info prevents renaming] */
/*! export XHRLoader [provided] [no usage info] [missing usage info prevents renaming] */
/*! export ZeroCurvatureEnding [provided] [no usage info] [missing usage info prevents renaming] */
/*! export ZeroFactor [provided] [no usage info] [missing usage info prevents renaming] */
/*! export ZeroSlopeEnding [provided] [no usage info] [missing usage info prevents renaming] */
/*! export ZeroStencilOp [provided] [no usage info] [missing usage info prevents renaming] */
/*! export sRGBEncoding [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


/***/ }),

/***/ "./src/js/index.ts":
/*!*************************!*\
  !*** ./src/js/index.ts ***!
  \*************************/
/*! namespace exports */
/*! exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ \"./node_modules/three/build/three.module.js\");\n/* harmony import */ var camera_controls__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! camera-controls */ \"./node_modules/camera-controls/dist/camera-controls.module.js\");\n/* harmony import */ var _css_style_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../css/style.scss */ \"./src/css/style.scss\");\n\r\n\r\n\r\nfunction main() {\r\n    var frame = document.getElementById('icosa');\r\n    var canvas = document.createElement('canvas');\r\n    canvas.id = 'c';\r\n    frame.appendChild(canvas);\r\n    var renderer = new three__WEBPACK_IMPORTED_MODULE_0__.WebGLRenderer({ canvas: canvas });\r\n    renderer.setPixelRatio(window.devicePixelRatio);\r\n    camera_controls__WEBPACK_IMPORTED_MODULE_1__.default.install({ THREE: three__WEBPACK_IMPORTED_MODULE_0__ });\r\n    var clock = new three__WEBPACK_IMPORTED_MODULE_0__.Clock();\r\n    var fov = 75;\r\n    var aspect = 2;\r\n    var near = 0.1;\r\n    var far = 1000;\r\n    var camera = new three__WEBPACK_IMPORTED_MODULE_0__.PerspectiveCamera(fov, aspect, near, far);\r\n    camera.position.set(10, 10, 10);\r\n    var cameraControls = new camera_controls__WEBPACK_IMPORTED_MODULE_1__.default(camera, canvas);\r\n    cameraControls.dampingFactor = 0.1;\r\n    cameraControls.polarRotateSpeed = cameraControls.azimuthRotateSpeed = 0.5;\r\n    cameraControls.setTarget(0, 0, 0);\r\n    cameraControls.dollyTo(3, true);\r\n    camera.updateProjectionMatrix();\r\n    var scene = new three__WEBPACK_IMPORTED_MODULE_0__.Scene();\r\n    scene.background = new three__WEBPACK_IMPORTED_MODULE_0__.Color(0xFFE5B4);\r\n    var box = new three__WEBPACK_IMPORTED_MODULE_0__.BoxGeometry();\r\n    var boxmesh = new three__WEBPACK_IMPORTED_MODULE_0__.Mesh(box);\r\n    scene.add(boxmesh);\r\n    function render() {\r\n        var updated = false;\r\n        var delta = clock.getDelta();\r\n        var elapsed = clock.getElapsedTime();\r\n        updated = updated || cameraControls.update(delta);\r\n        var needResize = canvas.width !== canvas.clientWidth || canvas.height !== canvas.clientHeight;\r\n        if (needResize) {\r\n            renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);\r\n            camera.aspect = canvas.clientWidth / canvas.clientHeight;\r\n            camera.updateProjectionMatrix();\r\n            updated = true;\r\n        }\r\n        requestAnimationFrame(render);\r\n        if (updated) {\r\n            renderer.render(scene, camera);\r\n        }\r\n    }\r\n    requestAnimationFrame(render);\r\n}\r\nfunction docReady(fn) {\r\n    // see if DOM is already available\r\n    if (document.readyState === \"complete\" || document.readyState === \"interactive\") {\r\n        // call on next available tick\r\n        setTimeout(fn, 1);\r\n    }\r\n    else {\r\n        document.addEventListener(\"DOMContentLoaded\", fn);\r\n    }\r\n}\r\ndocReady(function () {\r\n    main();\r\n});\r\n\n\n//# sourceURL=webpack://icosa/./src/js/index.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => module['default'] :
/******/ 				() => module;
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./src/js/index.ts");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;