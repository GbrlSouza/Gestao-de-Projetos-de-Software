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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
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
// eslint-disable-next-line @typescript-eslint/triple-slash-reference
///<reference path='../button/button-model.d.ts'/>
import { Button } from '../button/button';
import { EventHandler, Property } from '@syncfusion/ej2-base';
var SmartPasteButton = /** @class */ (function (_super) {
    __extends(SmartPasteButton, _super);
    /**
     * Constructor for creating the widget
     *
     * @private
     * @param {SmartPasteButtonModel} options - Specifies Smart paste button model
     * @param {string | HTMLButtonElement} element - Specifies target element
     */
    function SmartPasteButton(options, element) {
        return _super.call(this, options, element) || this;
    }
    SmartPasteButton.prototype.wireEvents = function () {
        EventHandler.add(this.element, 'click', this.smartPasteBtnClickHandler, this);
    };
    SmartPasteButton.prototype.unWireEvents = function () {
        EventHandler.remove(this.element, 'click', this.smartPasteBtnClickHandler);
    };
    SmartPasteButton.prototype.smartPasteBtnClickHandler = function (args) {
        return __awaiter(this, void 0, void 0, function () {
            var target, formElement, formFields, clipboardContent, fieldsData, systemRole, userRole, settings, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        target = args.target;
                        formElement = target.closest('form');
                        if (!formElement) {
                            return [2 /*return*/];
                        }
                        formFields = this.getFormFields(formElement);
                        if (formFields.length === 0) {
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.getClipboardContent().then(function (text) {
                                return text;
                            })];
                    case 1:
                        clipboardContent = _a.sent();
                        if (!(clipboardContent !== 'Clipboard API not supported' && clipboardContent !== 'Clipboard access failed')) return [3 /*break*/, 6];
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, , 5, 6]);
                        this.disabled = true;
                        fieldsData = formFields.map(function (field) {
                            return {
                                fieldName: field.fieldName,
                                description: field.description,
                                allowedValues: field.allowedValues,
                                type: field.type
                            };
                        });
                        systemRole = "\nCurrent date: " + new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) + "\n\nEach response line matches the following format:\nFIELD identifier^^^value\n\nGive a response with the following lines only, with values inferred from USER_DATA:\n" + this.formatFields(fieldsData) + "\nEND_RESPONSE\n\nDo not explain how the values were determined.\nFor fields without any corresponding information in USER_DATA, use value NO_DATA.";
                        userRole = "\nUSER_DATA: " + clipboardContent + "\n                    ";
                        settings = {
                            messages: [
                                { role: 'system', content: systemRole },
                                { role: 'user', content: userRole }
                            ],
                            temperature: 0.0,
                            topP: 1.0,
                            maxTokens: 2000,
                            frequencyPenalty: 0.1,
                            presencePenalty: 0.0,
                            stop: ['END_RESPONSE']
                        };
                        if (!(typeof this.aiAssistHandler === 'function')) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.aiAssistHandler(settings)];
                    case 3:
                        response = _a.sent();
                        if (typeof response === 'string' && response !== '') {
                            this.setFormFields(formElement, formFields, response);
                        }
                        _a.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        this.disabled = false;
                        return [7 /*endfinally*/];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    SmartPasteButton.prototype.formatFields = function (fields) {
        var result = [];
        fields.forEach(function (field) {
            var fieldOutput = [];
            fieldOutput.push("\nFIELD " + field.fieldName + "^^^");
            if (field.description) {
                fieldOutput.push("The " + field.description);
            }
            if (field.allowedValues && field.allowedValues.length > 0) {
                fieldOutput.push(' (multiple choice, with allowed values: ');
                fieldOutput.push(field.allowedValues.map(function (val) { return "" + val; }).join(','));
                fieldOutput.push(')');
            }
            else {
                fieldOutput.push(" of type " + field.type);
            }
            result.push(fieldOutput.join(''));
        });
        return result.join('');
    };
    SmartPasteButton.prototype.setFormFields = function (form, formFields, response) {
        var _this = this;
        var responseData = {};
        var fieldPrefix = 'FIELD ';
        var currentField = null;
        response.split('\n').forEach(function (line) {
            if (line.startsWith(fieldPrefix)) {
                var parts = line.substring(fieldPrefix.length).split('^^^');
                if (parts.length === 2) {
                    responseData["" + parts[0]] = parts[1];
                    currentField = parts[0];
                }
            }
            else if (currentField) {
                responseData["" + currentField] += '\n' + line;
            }
        });
        formFields.forEach(function (field) {
            var value = responseData[field.fieldName];
            if (value !== undefined) {
                value = value.trim();
                if (value === 'NO_DATA') {
                    return;
                }
                if (field.element instanceof HTMLInputElement && field.element.type === 'radio') {
                    var radioButton = _this.findRadioButton(form, field.element.name, value);
                    if (radioButton) {
                        _this.updateElementValue(radioButton, 'true');
                    }
                }
                else {
                    _this.updateElementValue(field.element, value);
                }
            }
        });
    };
    SmartPasteButton.prototype.findRadioButton = function (form, name, value) {
        var _this = this;
        var radioButtons = Array.from(form.querySelectorAll('input[type=radio]'))
            .filter(function (radio) { return radio instanceof HTMLInputElement && radio.name === name; })
            .map(function (radio) { return ({ elem: radio, text: _this.getElementDescription(form, radio) }); });
        var exactMatch = radioButtons.find(function (radio) { return radio.text === value; });
        if (exactMatch) {
            return exactMatch.elem;
        }
        var partialMatch = radioButtons.filter(function (radio) { return radio.text &&
            radio.text.includes(value); });
        if (partialMatch.length === 1) {
            return partialMatch[0].elem;
        }
        return null;
    };
    SmartPasteButton.prototype.triggerBeforeChange = function (element) {
        element.dispatchEvent(new CustomEvent('beforeinput', {
            bubbles: true,
            detail: {
                fromSmartComponents: true
            }
        }));
    };
    SmartPasteButton.prototype.triggerAfterChange = function (element) {
        element.dispatchEvent(new CustomEvent('input', {
            bubbles: true,
            detail: {
                fromSmartComponents: true
            }
        }));
        element.dispatchEvent(new CustomEvent('change', {
            bubbles: true,
            detail: {
                fromSmartComponents: true
            }
        }));
    };
    SmartPasteButton.prototype.updateElementValue = function (element, value) {
        var isEjsControl = element.classList.contains('e-control');
        if (element instanceof HTMLInputElement && (element.type === 'radio' || element.type === 'checkbox')) {
            var responseValue = value == null ? undefined : value.toString().toLowerCase();
            var isResponseValue = responseValue === 'true' || responseValue === 'yes' || responseValue === 'on';
            if (element.checked !== isResponseValue) {
                this.triggerBeforeChange(element);
                if (isEjsControl) {
                    element['ej2_instances'][0].checked = isResponseValue;
                }
                else {
                    element.checked = isResponseValue;
                }
                this.triggerAfterChange(element);
            }
        }
        else if (element instanceof HTMLSelectElement) {
            var optionText_1 = value.toString();
            var index = null;
            var options = Array.from(element.querySelectorAll('option'));
            var exactMatch = options.filter(function (option) { return option.textContent === optionText_1; });
            if (exactMatch.length > 0) {
                index = options.indexOf(exactMatch[0]);
            }
            else {
                var partialMatch = options.filter(function (option) { return option.textContent &&
                    option.textContent.indexOf(optionText_1) >= 0; });
                if (partialMatch.length === 1) {
                    index = options.indexOf(partialMatch[0]);
                }
            }
            if (index !== null && element.selectedIndex !== index) {
                this.triggerBeforeChange(element);
                if (isEjsControl) {
                    element['ej2_instances'][0].index = index;
                }
                else {
                    element.selectedIndex = index;
                }
                this.triggerAfterChange(element);
            }
        }
        else {
            this.triggerBeforeChange(element);
            if (element.classList.contains('e-rating') || element.classList.contains('e-colorpicker')) {
                element['ej2_instances'][0].value = value;
            }
            else {
                element.value = value;
            }
            this.triggerAfterChange(element);
        }
        element.focus();
    };
    SmartPasteButton.prototype.getFormFields = function (form) {
        var _this = this;
        var fields = [];
        var uniqueCount = 0;
        form.querySelectorAll('input, select, textarea').forEach(function (element) {
            if (!(element instanceof HTMLInputElement || element instanceof HTMLSelectElement || element instanceof HTMLTextAreaElement)) {
                return;
            }
            if (element.type === 'hidden' || _this.isFieldIgnore(element)) {
                return;
            }
            var isRadioButton = element.type === 'radio';
            var identifier = isRadioButton ? element.name : element.id || element.name || "unidentified_" + ++uniqueCount;
            if (isRadioButton && fields.find(function (field) { return field.fieldName === identifier; })) {
                return;
            }
            var FieldDescription = null;
            if (!isRadioButton) {
                FieldDescription = _this.getElementDescription(form, element);
                if (!FieldDescription) {
                    return;
                }
            }
            var fieldInfo = {
                fieldName: element.name,
                description: FieldDescription,
                element: element,
                type: element.type === 'checkbox' ? 'boolean' : element.type === 'number' ? 'number' : 'string'
            };
            if (element instanceof HTMLSelectElement) {
                var options = Array.from(element.querySelectorAll('option')).filter(function (option) { return option.value; });
                fieldInfo.allowedValues = options.map(function (option) { return option.textContent; });
                fieldInfo.type = 'fixed-choices';
            }
            else if (isRadioButton) {
                fieldInfo.allowedValues = [];
                fieldInfo.type = 'fixed-choices';
                Array.from(form.querySelectorAll('input[type=radio]')).forEach(function (radio) {
                    if (radio.name === identifier) {
                        var radioDescription = _this.getElementDescription(form, radio);
                        if (radioDescription) {
                            fieldInfo.allowedValues.push(radioDescription);
                        }
                    }
                });
            }
            fields.push(fieldInfo);
        });
        return fields;
    };
    SmartPasteButton.prototype.isFieldIgnore = function (element) {
        return element.hasAttribute('data-smartpaste-ignore') ||
            (element.hasAttribute('aria-disabled') && element.getAttribute('aria-disabled') === 'true') ||
            (element.hasAttribute('disabled')) || (element.hasAttribute('readonly')) ||
            (element.hasAttribute('aria-readonly') && element.getAttribute('aria-readonly') === 'true') ||
            (element.hasAttribute('aria-hidden') && element.getAttribute('aria-hidden') === 'true');
    };
    SmartPasteButton.prototype.getElementDescription = function (form, element) {
        if (element.hasAttribute('data-smartpaste-description')) {
            return element.getAttribute('data-smartpaste-description');
        }
        if ((element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement) && element.placeholder) {
            return element.placeholder;
        }
        var label = form.querySelector("label[for=\"" + element.id + "\"]");
        if (label) {
            return label.textContent.trim();
        }
        return element.name || element.id;
    };
    SmartPasteButton.prototype.getClipboardContent = function () {
        return __awaiter(this, void 0, void 0, function () {
            var navigatorObj, customClipboard, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        navigatorObj = navigator;
                        customClipboard = document.getElementById('custom-clipboard');
                        if (!(customClipboard && customClipboard.value)) return [3 /*break*/, 1];
                        return [2 /*return*/, customClipboard.value];
                    case 1:
                        if (!(typeof window !== 'undefined' && navigatorObj.clipboard && navigatorObj.clipboard.readText)) return [3 /*break*/, 6];
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, navigatorObj.clipboard.readText()];
                    case 3: return [2 /*return*/, _a.sent()];
                    case 4:
                        error_1 = _a.sent();
                        return [2 /*return*/, 'Clipboard access failed'];
                    case 5: return [3 /*break*/, 7];
                    case 6: return [2 /*return*/, 'Clipboard API not supported'];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        Property()
    ], SmartPasteButton.prototype, "aiAssistHandler", void 0);
    return SmartPasteButton;
}(Button));
export { SmartPasteButton };
