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
///<reference path='../textarea/textarea-model.d.ts'/>
import { EventHandler, Property, createElement } from '@syncfusion/ej2-base';
import { TextArea } from '../textarea/textarea';
import { CaretPositionHelper } from './caret-helper';
export var ChatMessageRole;
(function (ChatMessageRole) {
    ChatMessageRole["System"] = "system";
    ChatMessageRole["User"] = "user";
    ChatMessageRole["Assistant"] = "assistant";
})(ChatMessageRole || (ChatMessageRole = {}));
var SmartTextArea = /** @class */ (function (_super) {
    __extends(SmartTextArea, _super);
    /**
     * Constructor for creating the widget
     *
     * @private
     * @param {SmartTextArea} options - Specifies Smart text area model
     * @param {string | HTMLTextAreaElement} element - Specifies target element
     */
    function SmartTextArea(options, element) {
        return _super.call(this, options, element) || this;
    }
    SmartTextArea.prototype.render = function () {
        _super.prototype.render.call(this);
        if (!(this.element instanceof HTMLTextAreaElement)) {
            return;
        }
        this.textArea = this.element;
        var smartTextArea = createElement('smart-textarea');
        smartTextArea.classList.add('e-smart-textarea');
        this.textArea.after(smartTextArea);
        if (this.showSuggestionOnPopup !== 'None') {
            var suggestionState = this.showSuggestionOnPopup === 'Enable' ? 'false' : 'true';
            this.textArea.setAttribute('data-inline-suggestions', suggestionState);
        }
        this.suggestionDisplay = this.shouldShowInlineSuggestions(this.textArea) ?
            new InlineSuggestion(smartTextArea, this.textArea) : new ContextSuggestion(smartTextArea, this.textArea);
    };
    SmartTextArea.prototype.wireEvents = function () {
        var _this = this;
        _super.prototype.wireEvents.call(this);
        EventHandler.add(this.element, 'keyup', this.handleKeyUp, this);
        EventHandler.add(this.element, 'keydown', this.handleKeyDown, this);
        EventHandler.add(this.element, 'mousedown', this.removeExistingOrPendingSuggestion, this);
        EventHandler.add(this.element, 'focusout', this.removeExistingOrPendingSuggestion, this);
        this.element.addEventListener('scroll', (function () { return _this.suggestionDisplay.reject(); }), {
            passive: true
        });
    };
    SmartTextArea.prototype.unWireEvents = function () {
        var _this = this;
        _super.prototype.unWireEvents.call(this);
        EventHandler.remove(this.element, 'keyup', this.handleKeyUp);
        EventHandler.remove(this.element, 'keydown', this.handleKeyDown);
        EventHandler.remove(this.element, 'mousedown', this.removeExistingOrPendingSuggestion);
        EventHandler.remove(this.element, 'focusout', this.removeExistingOrPendingSuggestion);
        this.element.removeEventListener('scroll', (function () { return _this.suggestionDisplay.reject(); }));
    };
    SmartTextArea.prototype.keydownHandler = function () {
        // Overridden to prevent default behavior
    };
    SmartTextArea.prototype.shouldShowInlineSuggestions = function (textArea) {
        var inlineSuggestions = textArea.getAttribute('data-inline-suggestions');
        if (inlineSuggestions) {
            return inlineSuggestions.toLowerCase() === 'true';
        }
        return !('ontouchstart' in window);
    };
    SmartTextArea.prototype.handleKeyDown = function (event) {
        switch (event.key) {
            case 'Tab':
                if (this.suggestionDisplay.isShowing()) {
                    this.suggestionDisplay.accept();
                    event.preventDefault();
                }
                break;
            case 'Alt':
            case 'Control':
            case 'Shift':
            case 'Command':
                break;
            default:
                if (this.suggestionDisplay.isShowing() && this.suggestionDisplay.currentSuggestion.startsWith(event.key)) {
                    CaretPositionHelper.insertCharacter(this.textArea, event.key);
                    event.preventDefault();
                    this.suggestionDisplay.show(this.suggestionDisplay.currentSuggestion.substring(event.key.length));
                    CaretPositionHelper.adjustScrollToCaretPosition(this.textArea);
                }
                else {
                    this.removeExistingOrPendingSuggestion();
                }
                break;
        }
    };
    SmartTextArea.prototype.handleKeyUp = function () {
        var _this = this;
        if (!this.suggestionDisplay.isShowing()) {
            clearTimeout(this.typingDebounceTimeout);
            this.typingDebounceTimeout = setTimeout(function () { return _this.handleTypingPaused(); }, 350);
        }
    };
    SmartTextArea.prototype.handleTypingPaused = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (document.activeElement !== this.textArea) {
                            return [2 /*return*/];
                        }
                        if (!(this.textArea.selectionStart === this.textArea.selectionEnd &&
                            (this.textArea.selectionStart === this.textArea.value.length ||
                                this.textArea.value[this.textArea.selectionStart] === '\n'))) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.requestSuggestionAsync()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    SmartTextArea.prototype.removeExistingOrPendingSuggestion = function () {
        clearTimeout(this.typingDebounceTimeout);
        if (this.pendingSuggestionAbort) {
            this.pendingSuggestionAbort.abort();
            this.pendingSuggestionAbort = null;
        }
        this.suggestionDisplay.reject();
    };
    SmartTextArea.prototype.createSuggestionPrompt = function (textBefore, textAfter) {
        var stringBuilder = 'Predict what text the user in the given ROLE would insert at the cursor position indicated by ^^^.\nOnly give predictions for which you have' +
            ' an EXTREMELY high confidence that the user would insert that EXACT text.\nDo not make up new information. If you are not sure, ' +
            'just reply with NO_PREDICTION.\n\nRULES:\n1. Reply with OK:, then in square brackets the predicted text, then END_INSERTION, and no other output.\n2. ' +
            'When a specific value or quantity cannot be inferred and would need to be provided, use the word NEED_INFO.\n3. ' +
            'If there is not enough information to predict any words that the user would type next, just reply with the word NO_PREDICTION.' +
            '\n4. NEVER invent new information. If you can not be sure what the user is about to type, ALWAYS stop the prediction with END_INSERTION.';
        var userPhrases = this.UserPhrases;
        if (userPhrases && userPhrases.length > 0) {
            stringBuilder += '\nAlways try to use variations on the following phrases as part of the predictions:\n';
            for (var _i = 0, userPhrases_1 = userPhrases; _i < userPhrases_1.length; _i++) {
                var phrase = userPhrases_1[_i];
                stringBuilder += "- " + phrase + "\n";
            }
        }
        var chatMessageList = [
            { role: ChatMessageRole.System, content: stringBuilder },
            { role: ChatMessageRole.User, content: 'ROLE: Family member sending a text\nUSER_TEXT: Hey, it is a nice day - the weather is ^^^' },
            { role: ChatMessageRole.Assistant, content: 'OK:[great!]END_INSERTION' },
            { role: ChatMessageRole.User, content: 'ROLE: Customer service assistant\nUSER_TEXT: You can find more information on^^^\n\nAlternatively, phone us.' },
            { role: ChatMessageRole.Assistant, content: 'OK:[ our website at NEED_INFO]END_INSERTION' },
            { role: ChatMessageRole.User, content: 'ROLE: Casual\nUSER_TEXT: Oh I see!\n\nWell sure thing, we can' },
            { role: ChatMessageRole.Assistant, content: 'OK:[ help you out with that!]END_INSERTION' },
            { role: ChatMessageRole.User, content: 'ROLE: Storyteller\nUSER_TEXT: Sir Digby Chicken Caesar, also know^^^' },
            { role: ChatMessageRole.Assistant, content: 'OK:[n as NEED_INFO]END_INSERTION' },
            { role: ChatMessageRole.User, content: 'ROLE: Customer support agent\nUSER_TEXT: Goodbye for now.^^^' },
            { role: ChatMessageRole.Assistant, content: 'NO_PREDICTION END_INSERTION' },
            { role: ChatMessageRole.User, content: 'ROLE: Pirate\nUSER_TEXT: Have you found^^^' },
            { role: ChatMessageRole.Assistant, content: 'OK:[ the treasure, me hearties?]END_INSERTION' },
            { role: ChatMessageRole.User, content: "ROLE: " + this.userRole + "\nUSER_TEXT: " + textBefore + "^^^" + textAfter }
        ];
        return {
            messages: chatMessageList,
            temperature: 0.0,
            maxTokens: 400,
            stopSequences: ['END_INSERTION', 'NEED_INFO'],
            frequencyPenalty: 0.0,
            presencePenalty: 0.0
        };
    };
    SmartTextArea.prototype.requestSuggestionAsync = function () {
        return __awaiter(this, void 0, void 0, function () {
            var requestDetails, suggestionData, chatConfig, insertSuggestion, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.pendingSuggestionAbort) {
                            this.pendingSuggestionAbort.abort();
                            return [2 /*return*/];
                        }
                        this.pendingSuggestionAbort = new AbortController();
                        requestDetails = {
                            textAreaValue: this.textArea.value,
                            cursorPosition: this.textArea.selectionStart
                        };
                        suggestionData = {
                            textBefore: requestDetails.textAreaValue.substring(0, requestDetails.cursorPosition),
                            textAfter: requestDetails.textAreaValue.substring(requestDetails.cursorPosition)
                        };
                        chatConfig = this.createSuggestionPrompt(suggestionData.textBefore, suggestionData.textAfter);
                        if (!(typeof this.aiSuggestionHandler === 'function')) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.aiSuggestionHandler(chatConfig)];
                    case 1:
                        response = _a.sent();
                        insertSuggestion = this.validateSuggestion(response, suggestionData.textBefore);
                        _a.label = 2;
                    case 2:
                        if (insertSuggestion && requestDetails.textAreaValue === this.textArea.value &&
                            requestDetails.cursorPosition === this.textArea.selectionStart) {
                            if (!insertSuggestion.endsWith(' ')) {
                                insertSuggestion += ' ';
                            }
                            this.suggestionDisplay.show(insertSuggestion);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    SmartTextArea.prototype.validateSuggestion = function (response, textBefore) {
        var suggestion;
        if (typeof response !== 'string' || response.length <= 5 || response.indexOf('OK:[') !== 0) {
            return '';
        }
        var endIndex = this.indexOfAny(response, ['.', '?', '!']);
        if (endIndex > 0 && response.length > endIndex + 1 && response[endIndex + 1] === ' ') {
            response = response.substring(0, endIndex + 1);
        }
        suggestion = response.substring(4).replace(/[\]\s]+$/, '');
        if (textBefore.length > 0 && textBefore[textBefore.length - 1] === ' ') {
            suggestion = suggestion.replace(/^\s+/, '');
        }
        return suggestion;
    };
    SmartTextArea.prototype.indexOfAny = function (str, chars) {
        for (var i = 0; i < str.length; i++) {
            if (chars.indexOf(str["" + i]) !== -1) {
                return i;
            }
        }
        return -1;
    };
    SmartTextArea.prototype.getModuleName = function () {
        return 'smarttextarea';
    };
    SmartTextArea.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
        this.textArea = null;
        this.suggestionDisplay = null;
        this.typingDebounceTimeout = null;
    };
    __decorate([
        Property('')
    ], SmartTextArea.prototype, "userRole", void 0);
    __decorate([
        Property([])
    ], SmartTextArea.prototype, "UserPhrases", void 0);
    __decorate([
        Property()
    ], SmartTextArea.prototype, "aiSuggestionHandler", void 0);
    __decorate([
        Property('None')
    ], SmartTextArea.prototype, "showSuggestionOnPopup", void 0);
    return SmartTextArea;
}(TextArea));
export { SmartTextArea };
var InlineSuggestion = /** @class */ (function () {
    function InlineSuggestion(smartTextArea, textArea) {
        this.owner = smartTextArea;
        this.textArea = textArea;
        this.latestSuggestionText = '';
        this.suggestionStartPos = null;
        this.suggestionEndPos = null;
        this.virtualCaret = null;
        this.originalValueProperty = this.getOriginalValueProperty(textArea, 'value');
    }
    Object.defineProperty(InlineSuggestion.prototype, "value", {
        get: function () {
            var value = this.originalValueProperty.get.call(this.textArea);
            return this.isShowing() ? value.substring(0, this.suggestionStartPos) + value.substring(this.suggestionEndPos) : value;
        },
        set: function (newValue) {
            this.originalValueProperty.set.call(this.textArea, newValue);
        },
        enumerable: true,
        configurable: true
    });
    InlineSuggestion.prototype.getOriginalValueProperty = function (obj, property) {
        while (obj) {
            var descriptor = Object.getOwnPropertyDescriptor(obj, property);
            if (descriptor) {
                return descriptor;
            }
            obj = Object.getPrototypeOf(obj);
        }
        throw new Error("Property " + property + " not found on object or its prototype chain");
    };
    Object.defineProperty(InlineSuggestion.prototype, "valueIncludingSuggestion", {
        get: function () {
            return this.originalValueProperty.get.call(this.textArea);
        },
        set: function (newValue) {
            this.originalValueProperty.set.call(this.textArea, newValue);
        },
        enumerable: true,
        configurable: true
    });
    InlineSuggestion.prototype.isShowing = function () {
        return this.suggestionStartPos !== null;
    };
    InlineSuggestion.prototype.show = function (suggestionText) {
        this.latestSuggestionText = suggestionText;
        this.suggestionStartPos = this.textArea.selectionStart;
        this.suggestionEndPos = this.suggestionStartPos + suggestionText.length;
        this.textArea.setAttribute('data-suggestion-visible', '');
        this.valueIncludingSuggestion = this.valueIncludingSuggestion.substring(0, this.suggestionStartPos) +
            suggestionText +
            this.valueIncludingSuggestion.substring(this.suggestionStartPos);
        this.textArea.setSelectionRange(this.suggestionStartPos, this.suggestionEndPos);
        if (!this.virtualCaret) {
            this.virtualCaret = new VirtualCaret(this.owner, this.textArea);
        }
        this.virtualCaret.show();
    };
    Object.defineProperty(InlineSuggestion.prototype, "currentSuggestion", {
        get: function () {
            return this.latestSuggestionText;
        },
        enumerable: true,
        configurable: true
    });
    InlineSuggestion.prototype.accept = function () {
        this.textArea.setSelectionRange(this.suggestionEndPos, this.suggestionEndPos);
        this.suggestionStartPos = null;
        this.suggestionEndPos = null;
        if (this.virtualCaret) {
            this.virtualCaret.hide();
        }
        this.textArea.removeAttribute('data-suggestion-visible');
        CaretPositionHelper.adjustScrollToCaretPosition(this.textArea);
    };
    InlineSuggestion.prototype.reject = function () {
        if (!this.isShowing()) {
            return;
        }
        var selectionStart = this.textArea.selectionStart;
        var selectionEnd = this.textArea.selectionEnd;
        this.valueIncludingSuggestion = this.valueIncludingSuggestion.substring(0, this.suggestionStartPos) +
            this.valueIncludingSuggestion.substring(this.suggestionEndPos);
        if (this.suggestionStartPos === selectionStart && this.suggestionEndPos === selectionEnd) {
            this.textArea.setSelectionRange(selectionStart, selectionStart);
        }
        this.suggestionStartPos = null;
        this.suggestionEndPos = null;
        this.textArea.removeAttribute('data-suggestion-visible');
        if (this.virtualCaret) {
            this.virtualCaret.hide();
        }
    };
    return InlineSuggestion;
}());
var ContextSuggestion = /** @class */ (function () {
    function ContextSuggestion(container, textArea) {
        var _this = this;
        this.latestSuggestionText = '';
        this.showing = false;
        this.textArea = textArea;
        this.suggestionElement = document.createElement('div');
        this.suggestionElement.classList.add('smart-textarea-suggestion-overlay');
        this.suggestionElement.addEventListener('mousedown', function (event) { return _this.handleSuggestionClicked(event); });
        this.suggestionElement.addEventListener('touchend', function (event) { return _this.handleSuggestionClicked(event); });
        this.suggestionPrefixElement = document.createElement('span');
        this.suggestionTextElement = document.createElement('span');
        this.suggestionElement.appendChild(this.suggestionPrefixElement);
        this.suggestionElement.appendChild(this.suggestionTextElement);
        this.suggestionPrefixElement.style.opacity = '0.3';
        var computedStyle = window.getComputedStyle(this.textArea);
        this.suggestionElement.style.font = computedStyle.font;
        this.suggestionElement.style.marginTop = 1.4 * parseFloat(computedStyle.fontSize) + "px";
        container.appendChild(this.suggestionElement);
    }
    Object.defineProperty(ContextSuggestion.prototype, "currentSuggestion", {
        get: function () {
            return this.latestSuggestionText;
        },
        enumerable: true,
        configurable: true
    });
    ContextSuggestion.prototype.show = function (suggestionText) {
        this.latestSuggestionText = suggestionText;
        this.suggestionPrefixElement.textContent = suggestionText[0] !== ' ' ? this.getPrefixText(this.textArea, 20) : '';
        this.suggestionTextElement.textContent = suggestionText;
        var position = CaretPositionHelper.getTextAreaPosition(this.textArea);
        var style = this.suggestionElement.style;
        style.minWidth = null;
        this.suggestionElement.classList.add('smart-textarea-suggestion-overlay-visible');
        style.zIndex = this.textArea.style.zIndex + 1;
        style.top = position.top + "px";
        var leftPosition = position.left - this.suggestionPrefixElement.offsetWidth;
        if (!style.left || Math.abs(parseFloat(style.left) - leftPosition) > 10) {
            style.left = leftPosition + "px";
        }
        this.showing = true;
        var computedStyle = window.getComputedStyle(this.suggestionElement);
        var lineHeight = parseFloat(computedStyle.lineHeight);
        var paddingTop = parseFloat(computedStyle.paddingTop);
        var paddingBottom = parseFloat(computedStyle.paddingBottom);
        var lines = Math.round((this.suggestionElement.offsetHeight - paddingTop - paddingBottom) / lineHeight);
        if (lines > 2) {
            var elementWidth = this.suggestionElement.offsetWidth;
            style.minWidth = "calc(min(70vw, " + (lines * elementWidth) / 2 + "px))";
        }
        var rect = this.suggestionElement.getBoundingClientRect();
        if (rect.right > document.body.clientWidth - 20) {
            style.left = "calc(" + (parseFloat(style.left) - (rect.right - document.body.clientWidth)) + "px - 2rem)";
        }
    };
    ContextSuggestion.prototype.accept = function () {
        if (this.showing) {
            CaretPositionHelper.insertCharacter(this.textArea, this.currentSuggestion);
            CaretPositionHelper.adjustScrollToCaretPosition(this.textArea);
            this.hide();
        }
    };
    ContextSuggestion.prototype.reject = function () {
        this.hide();
    };
    ContextSuggestion.prototype.hide = function () {
        if (this.showing) {
            this.showing = false;
            this.suggestionElement.classList.remove('smart-textarea-suggestion-overlay-visible');
        }
    };
    ContextSuggestion.prototype.isShowing = function () {
        return this.showing;
    };
    ContextSuggestion.prototype.handleSuggestionClicked = function (event) {
        event.preventDefault();
        event.stopImmediatePropagation();
        this.accept();
    };
    ContextSuggestion.prototype.getPrefixText = function (textArea, maxLength) {
        var value = textArea.value;
        var selectionStart = textArea.selectionStart;
        for (var i = selectionStart - 1; i > selectionStart - maxLength; i--) {
            if (i < 0 || /\s/.test(value["" + i])) {
                return value.substring(i + 1, selectionStart);
            }
        }
        return '';
    };
    return ContextSuggestion;
}());
var VirtualCaret = /** @class */ (function () {
    function VirtualCaret(smartTextArea, textArea) {
        this.textArea = textArea;
        this.caretDiv = document.createElement('div');
        this.caretDiv.classList.add('smart-textarea-caret');
        smartTextArea.appendChild(this.caretDiv);
    }
    VirtualCaret.prototype.show = function () {
        var textAreaPosition = CaretPositionHelper.getTextAreaPosition(this.textArea);
        var caretStyle = this.caretDiv.style;
        caretStyle.display = 'block';
        caretStyle.top = textAreaPosition.top + 'px';
        caretStyle.left = textAreaPosition.left + 'px';
        caretStyle.height = textAreaPosition.height + 'px';
        caretStyle.zIndex = this.textArea.style.zIndex;
        caretStyle.backgroundColor = textAreaPosition.elemStyle.caretColor;
    };
    VirtualCaret.prototype.hide = function () {
        this.caretDiv.style.display = 'none';
    };
    return VirtualCaret;
}());
