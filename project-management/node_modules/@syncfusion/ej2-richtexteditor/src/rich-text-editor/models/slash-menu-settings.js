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
import { ChildProperty, Property } from '@syncfusion/ej2-base';
import { DialogType } from '../base/enum';
/**
 * Configures the slash menu settings of the RichTextEditor.
 */
var SlashMenuSettings = /** @class */ (function (_super) {
    __extends(SlashMenuSettings, _super);
    function SlashMenuSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(false)
    ], SlashMenuSettings.prototype, "enable", void 0);
    __decorate([
        Property(['Paragraph', 'Heading 1', 'Heading 2', 'Heading 3', 'Heading 4', 'OrderedList', 'UnorderedList', 'CodeBlock', 'Blockquote'])
    ], SlashMenuSettings.prototype, "items", void 0);
    __decorate([
        Property('300px')
    ], SlashMenuSettings.prototype, "popupWidth", void 0);
    __decorate([
        Property('320px')
    ], SlashMenuSettings.prototype, "popupHeight", void 0);
    return SlashMenuSettings;
}(ChildProperty));
export { SlashMenuSettings };
export var defaultSlashMenuDataModel = [
    {
        command: 'Paragraph',
        subCommand: 'p',
        type: 'Basic Block',
        iconCss: 'e-rte-paragraph'
    },
    {
        command: 'Heading 1',
        subCommand: 'h1',
        type: 'Basic Block',
        iconCss: 'e-rte-h1'
    },
    {
        command: 'Heading 2',
        subCommand: 'h2',
        type: 'Basic Block',
        iconCss: 'e-rte-h2'
    },
    {
        command: 'Heading 3',
        subCommand: 'h3',
        type: 'Basic Block',
        iconCss: 'e-rte-h3'
    },
    {
        command: 'Heading 4',
        subCommand: 'h4',
        type: 'Basic Block',
        iconCss: 'e-rte-h4'
    },
    {
        command: 'OrderedList',
        subCommand: 'insertOrderedList',
        type: 'Basic Block',
        iconCss: 'e-list-ordered e-icons'
    },
    {
        command: 'UnorderedList',
        subCommand: 'insertUnorderedList',
        type: 'Basic Block',
        iconCss: 'e-list-unordered e-icons'
    },
    {
        command: 'Blockquote',
        subCommand: 'blockquote',
        type: 'Basic Block',
        iconCss: 'e-blockquote e-icons'
    },
    {
        command: 'CodeBlock',
        subCommand: 'pre',
        type: 'Basic Block',
        iconCss: 'e-code-view e-icons'
    }
];
export var injectibleSlashMenuDataModel = [
    {
        command: 'Image',
        subCommand: DialogType.InsertImage,
        type: 'Media',
        module: 'Image',
        iconCss: 'e-icons e-image'
    },
    {
        command: 'Audio',
        subCommand: DialogType.InsertAudio,
        type: 'Media',
        module: 'Audio',
        iconCss: 'e-icons e-audio'
    },
    {
        command: 'Video',
        subCommand: DialogType.InsertVideo,
        type: 'Media',
        module: 'Video',
        iconCss: 'e-icons e-video'
    },
    {
        command: 'Link',
        subCommand: DialogType.InsertLink,
        type: 'Inline',
        module: 'Link',
        iconCss: 'e-icons e-link'
    },
    {
        command: 'Table',
        subCommand: DialogType.InsertTable,
        type: 'Basic Block',
        module: 'Table',
        iconCss: 'e-icons e-table'
    },
    {
        command: 'Emojipicker',
        subCommand: null,
        type: 'Inline',
        module: 'EmojiPicker',
        iconCss: 'e-icons e-emoji'
    }
];
