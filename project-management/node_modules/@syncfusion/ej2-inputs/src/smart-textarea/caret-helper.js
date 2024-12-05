var CaretPositionHelper = /** @class */ (function () {
    function CaretPositionHelper() {
    }
    CaretPositionHelper.createStyledDiv = function (target, htmlContent) {
        var div = document.createElement('div');
        var styles = {
            position: 'absolute',
            left: -9999,
            top: 0,
            zIndex: -2000
        };
        this.properties.forEach(function (prop) {
            styles["" + prop] = getComputedStyle(target)[prop];
        });
        Object.keys(styles).forEach(function (key) {
            div.style["" + key] = styles["" + key];
        });
        var scrollbarWidth = target.offsetWidth - target.clientWidth;
        div.style.width = (target.clientWidth + scrollbarWidth) + 'px';
        div.innerHTML = htmlContent;
        if (target && target.parentNode) {
            target.parentNode.insertBefore(div, target.nextSibling);
        }
        return div;
    };
    CaretPositionHelper.createCaretMarker = function (target, htmlContent) {
        var div = this.createStyledDiv(target, htmlContent);
        var marker = div.ownerDocument.getElementById('caret-position-marker');
        var position = {
            left: marker.offsetLeft,
            top: marker.offsetTop,
            height: marker.offsetHeight
        };
        if (div && div.parentNode) {
            div.parentNode.removeChild(div);
        }
        return position;
    };
    CaretPositionHelper.escapeHtml = function (value) {
        return value.replace(/<|>|`|"|&/g, '?').replace(/\r\n|\r|\n/g, '<br/>');
    };
    CaretPositionHelper.getCaretPosition = function (target) {
        var position = target.selectionStart || 0;
        var textBeforeCaret = target.value.slice(0, position);
        var textAfterCaret = target.value.slice(position);
        var content = "<span style=\"position: relative; display: inline;\">" + this.escapeHtml(textBeforeCaret) + "</span>";
        content += '<span id="caret-position-marker" style="position: relative; display: inline;">|</span>';
        content += "<span style=\"position: relative; display: inline;\">" + this.escapeHtml(textAfterCaret) + "</span>";
        var rect = this.createCaretMarker(target, content);
        rect.pos = position;
        return rect;
    };
    CaretPositionHelper.adjustScrollToCaretPosition = function (element) {
        var caretPosition = this.getCaretPosition(element);
        var lineHeight = parseFloat(window.getComputedStyle(element).lineHeight);
        if (caretPosition.top > element.clientHeight + element.scrollTop - lineHeight) {
            element.scrollTop = caretPosition.top - element.clientHeight + lineHeight;
        }
    };
    CaretPositionHelper.getTextAreaPosition = function (element) {
        var computedStyle = window.getComputedStyle(element);
        var position = this.getCaretPosition(element);
        return {
            top: position.top + parseFloat(computedStyle.borderTopWidth) + element.offsetTop - element.scrollTop,
            left: position.left + parseFloat(computedStyle.borderLeftWidth) + element.offsetLeft - element.scrollLeft - 0.25,
            height: position.height,
            elemStyle: computedStyle
        };
    };
    CaretPositionHelper.insertCharacter = function (element, text) {
        var start = element.selectionStart;
        var end = element.selectionEnd;
        element.value = element.value.substring(0, start) + text + element.value.substring(end);
        start += text.length;
        element.setSelectionRange(start, start);
    };
    CaretPositionHelper.properties = [
        'borderBottomWidth', 'borderLeftWidth', 'borderRightWidth', 'borderTopStyle',
        'borderRightStyle', 'borderBottomStyle', 'borderLeftStyle', 'borderTopWidth',
        'boxSizing', 'fontFamily', 'fontSize', 'fontWeight', 'height', 'letterSpacing',
        'lineHeight', 'marginBottom', 'marginLeft', 'marginRight', 'marginTop',
        'outlineWidth', 'overflow', 'overflowX', 'overflowY', 'paddingBottom',
        'paddingLeft', 'paddingRight', 'paddingTop', 'textAlign', 'textOverflow',
        'textTransform', 'whiteSpace', 'wordBreak', 'wordWrap', 'width'
    ];
    return CaretPositionHelper;
}());
export { CaretPositionHelper };
