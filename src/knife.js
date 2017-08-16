export default {
    // 浅拷贝
	extendCopy(p) {
        let c = {};
        for (let i in p) { 
            c[i] = p[i];
        }
        c.uber = p;
        return c;
    },
    // 深拷贝
    deepCopy(p, c) {
        var c = c || {};
        for (var i in p) {
            if (typeof p[i] === 'object' && p[i]) {
                c[i] = (p[i].constructor === Array)? [] : {};
                this.deepCopy(p[i], c[i]);
            } else {
                c[i] = p[i];
            }
        }
        return c;
    },
    // 收款数字格式化
    currencyFormat(number, len) {
        return (Math.trunc(number * 100) / 100).toFixed(len);
    },
    // 收款数字格式化
    currencyParse(newString, oldNumber, len) {
        var CleanParse = function (value) {
            return { value: value };
        }
        var CurrencyWarning = function (warning, value) {
            return {
                warning: warning,
                value: value,
                attempt: newString 
            };
        }
        var NotAValidDollarAmountWarning = function (value) {
            return new CurrencyWarning(newString + ' is not a valid dollar amount', value);
        }
        var AutomaticConversionWarning = function (value) {
            return new CurrencyWarning(newString + ' was automatically converted to ' + value, value);
        }
    
        var newNumber = Number(newString);
        var indexOfDot = newString.indexOf('.');
        var indexOfE = newString.indexOf('e');
        
        if (isNaN(newNumber)) { 
            if (
                indexOfDot === -1 &&
                indexOfE > 0 &&
                indexOfE === newString.length - 1 &&
                Number(newString.slice(0, indexOfE)) !== 0
            ) {
                return new CleanParse(oldNumber);
            } else {
                return new NotAValidDollarAmountWarning(oldNumber);
            }
        }
        
        var newCurrencyString = this.currencyFormat(newNumber, len);
        var newCurrencyNumber = Number(newCurrencyString);

        if (newCurrencyNumber === newNumber) {
            if (indexOfE !== -1 && indexOfE === newString.length - 2) {
                return new AutomaticConversionWarning(newNumber);
            } else {
                return new CleanParse(newNumber);
            }
        } else {
            return new NotAValidDollarAmountWarning(
                newNumber > newCurrencyNumber
                ? newCurrencyNumber
                : oldNumber
            );
        }
    },
    isObject(value) {
        var type = typeof value;
        return !!value && (type == 'object' || type == 'function');
    },
    toNumber(value) {
      if (typeof value == 'number') {
        return value;
      }
      if (isSymbol(value)) {
        return NAN;
      }
      if (isObject(value)) {
        var other = isFunction(value.valueOf) ? value.valueOf() : value;
        value = isObject(other) ? (other + '') : other;
      }
      if (typeof value != 'string') {
        return value === 0 ? value : +value;
      }
      value = value.replace(reTrim, '');
      var isBinary = reIsBinary.test(value);
      return (isBinary || reIsOctal.test(value))
        ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
        : (reIsBadHex.test(value) ? NAN : +value);
    },
    // 延迟函数
    debounce(func, wait, options) {
        var lastArgs,
            lastThis,
            maxWait,
            result,
            timerId,
            lastCallTime,
            lastInvokeTime = 0,
            leading = false,
            maxing = false,
            trailing = true;

        if (typeof func != 'function') {
            throw new TypeError(FUNC_ERROR_TEXT);
        }
        wait = this.toNumber(wait) || 0;
        if (this.isObject(options)) {
            leading = !!options.leading;
            maxing = 'maxWait' in options;
            maxWait = maxing ? nativeMax(this.toNumber(options.maxWait) || 0, wait) : maxWait;
            trailing = 'trailing' in options ? !!options.trailing : trailing;
        }

        function invokeFunc(time) {
            var args = lastArgs,
                thisArg = lastThis;

            lastArgs = lastThis = undefined;
            lastInvokeTime = time;
            result = func.apply(thisArg, args);
            return result;
        }

        function leadingEdge(time) {
            // Reset any `maxWait` timer.
            lastInvokeTime = time;
            // Start the timer for the trailing edge.
            timerId = setTimeout(timerExpired, wait);
            // Invoke the leading edge.
            return leading ? invokeFunc(time) : result;
        }

        function remainingWait(time) {
            var timeSinceLastCall = time - lastCallTime,
                timeSinceLastInvoke = time - lastInvokeTime,
                result = wait - timeSinceLastCall;

            return maxing ? nativeMin(result, maxWait - timeSinceLastInvoke) : result;
        }

        function shouldInvoke(time) {
            var timeSinceLastCall = time - lastCallTime,
                timeSinceLastInvoke = time - lastInvokeTime;

            return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
                (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
        }

        function timerExpired() {
            var time = Date.now();
            if (shouldInvoke(time)) {
                return trailingEdge(time);
            }
            // 重启定时器
            timerId = setTimeout(timerExpired, remainingWait(time));
        }

        function trailingEdge(time) {
            timerId = undefined;

            if (trailing && lastArgs) {
                return invokeFunc(time);
            }
            lastArgs = lastThis = undefined;
            return result;
        }

        function cancel() {
            lastInvokeTime = 0;
            lastArgs = lastCallTime = lastThis = timerId = undefined;
        }

        function flush() {
            return timerId === undefined ? result : trailingEdge(Date.now());
        }

        function debounced() {
            var time = Date.now(),
                isInvoking = shouldInvoke(time);

            lastArgs = arguments;
            lastThis = this;
            lastCallTime = time;

            if (isInvoking) {
                if (timerId === undefined) {
                    return leadingEdge(lastCallTime);
                }
                if (maxing) {
                    timerId = setTimeout(timerExpired, wait);
                    return invokeFunc(lastCallTime);
                }
            }
            if (timerId === undefined) {
                timerId = setTimeout(timerExpired, wait);
            }
            return result;
        }
        debounced.cancel = cancel;
        debounced.flush = flush;
        return debounced;
    },
    // 柯里化
    add() {
        // 第一次执行时，定义一个数组专门用来存储所有的参数
        var _args = [].slice.call(arguments);

        // 在内部声明一个函数，利用闭包的特性保存_args并收集所有的参数值
        var adder = function () {
            function _adder() {
                [].push.apply(_args, [].slice.call(arguments));
                return _adder;
            };

            // 利用隐式转换的特性，当最后执行时隐式转换，并计算最终的值返回
            _adder.valueOf = function () {
                return _args.reduce(function (a, b) {
                    return a + b;
                });
            }

            return _adder;
        }
        return adder.apply(null, [].slice.call(arguments));
    },
    // base64加密函数,用于生成字符串对应的base64加密字符串
    base64Encode(input) {
        var rv;
        rv = encodeURIComponent(input);
        rv = unescape(rv);
        rv = window.btoa(rv);
        return rv;
    },
    // base64解密函数,用于解密base64加密的字符串
    base64Decode(input) {
        var rv;
        rv = window.atob(input);
        rv = escape(rv);
        rv = decodeURIComponent(rv);
        return rv;
    },
    // 格式化时间
    formatDate(date, fmt) {
        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
        }
        let o = {
            'M+': date.getMonth() + 1,
            'd+': date.getDate(),
            'h+': date.getHours(),
            'm+': date.getMinutes(),
            's+': date.getSeconds()
        }
        for (let k in o) {
            if (new RegExp(`(${k})`).test(fmt)) {
                let str = o[k] + ''
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : this.padLeftZero(str))
            }
        }
        return fmt
    },
    // 左填充 0
    padLeftZero(str) {
        return ('00' + str).substr(str.length);
    }
}
