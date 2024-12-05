/**
 * Used to `write a string` into output file.
 * @private
 */
var PdfWriter = /** @class */ (function () {
    function PdfWriter(stream) {
        this.streamWriter = stream;
    }
    Object.defineProperty(PdfWriter.prototype, "document", {
        //properties
        /**
         * Gets and Sets the `document`.
         * @private
         */
        get: function () {
            return this.pdfDocument;
        },
        set: function (value) {
            this.pdfDocument = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfWriter.prototype, "position", {
        /**
         * Gets the `position`.
         * @private
         */
        get: function () {
            return this.streamWriter.buffer.size;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfWriter.prototype, "length", {
        /**
         * Gets  the `length` of the stream'.
         * @private
         */
        get: function () {
            return this.streamWriter.buffer.size;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PdfWriter.prototype, "stream", {
        /**
         * Gets the `stream`.
         * @private
         */
        get: function () {
            return this.streamWriter;
        },
        enumerable: true,
        configurable: true
    });
    //public Methods
    /**
     * `Writes the specified data`.
     * @private
     */
    PdfWriter.prototype.write = function (overload) {
        var data = [];
        var tempOverload = overload;
        this.streamWriter.write(tempOverload);
    };
    return PdfWriter;
}());
export { PdfWriter };
/**
 * Helper class for PDF writer.
 * @private
 */
var PdfWriterHelper = /** @class */ (function () {
    /**
     * Initialize an instance of `PdfWriterHelper` class.
     * @private
     */
    function PdfWriterHelper() {
        this.buffer = new PdfArrayBuffer();
    }
    /**
     * Writes the specified data.
     * @private
     */
    PdfWriterHelper.prototype.write = function (data) {
        this.buffer.write(data);
    };
    /**
     * Destroy the array buffer.
     * @private
     */
    PdfWriterHelper.prototype.destroy = function () {
        if (this.buffer) {
            this.buffer.destroy();
            this.buffer = undefined;
        }
    };
    return PdfWriterHelper;
}());
export { PdfWriterHelper };
/**
 * Helper class for PDF writer.
 * @private
 */
var PdfArrayBuffer = /** @class */ (function () {
    /**
     * Initialize an instance of `PdfArrayBuffer` class.
     * @private
     */
    function PdfArrayBuffer() {
        this.buffer = [];
    }
    Object.defineProperty(PdfArrayBuffer.prototype, "size", {
        /**
         * Gets the `size`.
         * @private
         */
        get: function () {
            return this.buffer.length;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Writes the specified data.
     * @private
     */
    PdfArrayBuffer.prototype.write = function (value) {
        for (var i = 0; i < value.length; i++) {
            this.buffer.push(value.charCodeAt(i) & 0xff);
        }
    };
    /**
     * Destroy the array buffer.
     * @private
     */
    PdfArrayBuffer.prototype.destroy = function () {
        if (this.buffer) {
            this.buffer = [];
            this.buffer = undefined;
        }
    };
    return PdfArrayBuffer;
}());
export { PdfArrayBuffer };
