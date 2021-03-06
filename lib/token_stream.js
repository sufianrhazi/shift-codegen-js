"use strict";

var code = require("esutils").code;


function numberDot(fragment) {
  if (fragment.indexOf(".") < 0 && fragment.indexOf("e") < 0) {
    return "..";
  }
  return ".";
}

var TokenStream = (function () {
  var TokenStream = function TokenStream() {
    this.result = "";
    this.lastNumber = null;
    this.lastChar = null;
    this.optionalSemi = false;
  };

  TokenStream.prototype.putNumber = function (number) {
    var tokenStr = number.toString();
    this.put(tokenStr);
    this.lastNumber = tokenStr;
  };

  TokenStream.prototype.putOptionalSemi = function () {
    this.optionalSemi = true;
  };

  TokenStream.prototype.put = function (tokenStr) {
    if (this.optionalSemi) {
      this.optionalSemi = false;
      if (tokenStr !== "}") {
        this.put(";");
      }
    }
    if (this.lastNumber !== null && tokenStr.length == 1) {
      if (tokenStr === ".") {
        this.result += numberDot(this.lastNumber);
        this.lastNumber = null;
        this.lastChar = ".";
        return;
      }
    }
    this.lastNumber = null;
    var rightChar = tokenStr.charAt(0);
    var lastChar = this.lastChar;
    this.lastChar = tokenStr.charAt(tokenStr.length - 1);
    if (lastChar && ((lastChar == "+" || lastChar == "-") && lastChar == rightChar || code.isIdentifierPart(lastChar.charCodeAt(0)) && code.isIdentifierPart(rightChar.charCodeAt(0)) || lastChar == "/" && rightChar == "i")) {
      this.result += " ";
    }

    this.result += tokenStr;
  };

  return TokenStream;
})();

exports.TokenStream = TokenStream;
//# sourceMappingURL=data:application/json;base64,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dGVudCI6WyIvKipcbiAqIENvcHlyaWdodCAyMDE0IFNoYXBlIFNlY3VyaXR5LCBJbmMuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKVxuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuaW1wb3J0IHtjb2RlfSBmcm9tIFwiZXN1dGlsc1wiO1xuXG5mdW5jdGlvbiBudW1iZXJEb3QoZnJhZ21lbnQpIHtcbiAgaWYgKGZyYWdtZW50LmluZGV4T2YoXCIuXCIpIDwgMCAmJiBmcmFnbWVudC5pbmRleE9mKFwiZVwiKSA8IDApIHtcbiAgICByZXR1cm4gXCIuLlwiO1xuICB9XG4gIHJldHVybiBcIi5cIjtcbn1cblxuZXhwb3J0IGNsYXNzIFRva2VuU3RyZWFtIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5yZXN1bHQgPSBcIlwiO1xuICAgIHRoaXMubGFzdE51bWJlciA9IG51bGw7XG4gICAgdGhpcy5sYXN0Q2hhciA9IG51bGw7XG4gICAgdGhpcy5vcHRpb25hbFNlbWkgPSBmYWxzZTtcbiAgfVxuXG4gIHB1dE51bWJlcihudW1iZXIpIHtcbiAgICBsZXQgdG9rZW5TdHIgPSBudW1iZXIudG9TdHJpbmcoKTtcbiAgICB0aGlzLnB1dCh0b2tlblN0cik7XG4gICAgdGhpcy5sYXN0TnVtYmVyID0gdG9rZW5TdHI7XG4gIH1cblxuICBwdXRPcHRpb25hbFNlbWkoKSB7XG4gICAgdGhpcy5vcHRpb25hbFNlbWkgPSB0cnVlO1xuICB9XG5cbiAgcHV0KHRva2VuU3RyKSB7XG4gICAgaWYgKHRoaXMub3B0aW9uYWxTZW1pKSB7XG4gICAgICB0aGlzLm9wdGlvbmFsU2VtaSA9IGZhbHNlO1xuICAgICAgaWYgKHRva2VuU3RyICE9PSBcIn1cIikge1xuICAgICAgICB0aGlzLnB1dChcIjtcIik7XG4gICAgICB9XG4gICAgfVxuICAgIGlmICh0aGlzLmxhc3ROdW1iZXIgIT09IG51bGwgJiYgdG9rZW5TdHIubGVuZ3RoID09IDEpIHtcbiAgICAgIGlmICh0b2tlblN0ciA9PT0gXCIuXCIpIHtcbiAgICAgICAgdGhpcy5yZXN1bHQgKz0gbnVtYmVyRG90KHRoaXMubGFzdE51bWJlcik7XG4gICAgICAgIHRoaXMubGFzdE51bWJlciA9IG51bGw7XG4gICAgICAgIHRoaXMubGFzdENoYXIgPSBcIi5cIjtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLmxhc3ROdW1iZXIgPSBudWxsO1xuICAgIGxldCByaWdodENoYXIgPSB0b2tlblN0ci5jaGFyQXQoMCk7XG4gICAgbGV0IGxhc3RDaGFyID0gdGhpcy5sYXN0Q2hhcjtcbiAgICB0aGlzLmxhc3RDaGFyID0gdG9rZW5TdHIuY2hhckF0KHRva2VuU3RyLmxlbmd0aCAtIDEpO1xuICAgIGlmIChsYXN0Q2hhciAmJlxuICAgICAgICAoKGxhc3RDaGFyID09IFwiK1wiIHx8IGxhc3RDaGFyID09IFwiLVwiKSAmJlxuICAgICAgICBsYXN0Q2hhciA9PSByaWdodENoYXIgfHxcbiAgICAgICAgY29kZS5pc0lkZW50aWZpZXJQYXJ0KGxhc3RDaGFyLmNoYXJDb2RlQXQoMCkpICYmIGNvZGUuaXNJZGVudGlmaWVyUGFydChyaWdodENoYXIuY2hhckNvZGVBdCgwKSkgfHxcbiAgICAgICAgbGFzdENoYXIgPT0gXCIvXCIgJiYgcmlnaHRDaGFyID09IFwiaVwiKSkge1xuICAgICAgdGhpcy5yZXN1bHQgKz0gXCIgXCI7XG4gICAgfVxuXG4gICAgdGhpcy5yZXN1bHQgKz0gdG9rZW5TdHI7XG4gIH1cbn1cbiJdfQ==