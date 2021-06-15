const unescapedHTMLExp = /[&<>"']/g;
const hasUnescapedHTMLExp = RegExp(unescapedHTMLExp.source);
const htmlEscapes = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    '\'': '&#39;'
};
export function escapeHTML(string) {
    return (string && hasUnescapedHTMLExp.test(string)) ?
        string.replace(unescapedHTMLExp, chr => htmlEscapes[chr]) :
        string;
}
export function isDefined(value) {
    return value !== undefined && value !== null;
}
export function isObject(value) {
    return typeof value === 'object' && isDefined(value);
}
export function isPromise(value) {
    return value instanceof Promise;
}
export function isFunction(value) {
    return value instanceof Function;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsdWUtdXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbmctc2VsZWN0L2xpYi92YWx1ZS11dGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLGdCQUFnQixHQUFHLFVBQVUsQ0FBQztBQUNwQyxNQUFNLG1CQUFtQixHQUFHLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUM1RCxNQUFNLFdBQVcsR0FBRztJQUNoQixHQUFHLEVBQUUsT0FBTztJQUNaLEdBQUcsRUFBRSxNQUFNO0lBQ1gsR0FBRyxFQUFFLE1BQU07SUFDWCxHQUFHLEVBQUUsUUFBUTtJQUNiLElBQUksRUFBRSxPQUFPO0NBQ2hCLENBQUM7QUFFRixNQUFNLFVBQVUsVUFBVSxDQUFDLE1BQWM7SUFDckMsT0FBTyxDQUFDLE1BQU0sSUFBSSxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2pELE1BQU0sQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLEVBQUUsR0FBRyxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzNELE1BQU0sQ0FBQztBQUNmLENBQUM7QUFFRCxNQUFNLFVBQVUsU0FBUyxDQUFDLEtBQVU7SUFDaEMsT0FBTyxLQUFLLEtBQUssU0FBUyxJQUFJLEtBQUssS0FBSyxJQUFJLENBQUM7QUFDakQsQ0FBQztBQUVELE1BQU0sVUFBVSxRQUFRLENBQUMsS0FBVTtJQUMvQixPQUFPLE9BQU8sS0FBSyxLQUFLLFFBQVEsSUFBSSxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDekQsQ0FBQztBQUVELE1BQU0sVUFBVSxTQUFTLENBQUMsS0FBVTtJQUNoQyxPQUFPLEtBQUssWUFBWSxPQUFPLENBQUM7QUFDcEMsQ0FBQztBQUVELE1BQU0sVUFBVSxVQUFVLENBQUMsS0FBVTtJQUNqQyxPQUFPLEtBQUssWUFBWSxRQUFRLENBQUM7QUFDckMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHVuZXNjYXBlZEhUTUxFeHAgPSAvWyY8PlwiJ10vZztcbmNvbnN0IGhhc1VuZXNjYXBlZEhUTUxFeHAgPSBSZWdFeHAodW5lc2NhcGVkSFRNTEV4cC5zb3VyY2UpO1xuY29uc3QgaHRtbEVzY2FwZXMgPSB7XG4gICAgJyYnOiAnJmFtcDsnLFxuICAgICc8JzogJyZsdDsnLFxuICAgICc+JzogJyZndDsnLFxuICAgICdcIic6ICcmcXVvdDsnLFxuICAgICdcXCcnOiAnJiMzOTsnXG59O1xuXG5leHBvcnQgZnVuY3Rpb24gZXNjYXBlSFRNTChzdHJpbmc6IHN0cmluZykge1xuICAgIHJldHVybiAoc3RyaW5nICYmIGhhc1VuZXNjYXBlZEhUTUxFeHAudGVzdChzdHJpbmcpKSA/XG4gICAgICAgIHN0cmluZy5yZXBsYWNlKHVuZXNjYXBlZEhUTUxFeHAsIGNociA9PiBodG1sRXNjYXBlc1tjaHJdKSA6XG4gICAgICAgIHN0cmluZztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzRGVmaW5lZCh2YWx1ZTogYW55KSB7XG4gICAgcmV0dXJuIHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09IG51bGw7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc09iamVjdCh2YWx1ZTogYW55KSB7XG4gICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgaXNEZWZpbmVkKHZhbHVlKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzUHJvbWlzZSh2YWx1ZTogYW55KSB7XG4gICAgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUHJvbWlzZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzRnVuY3Rpb24odmFsdWU6IGFueSkge1xuICAgIHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIEZ1bmN0aW9uO1xufVxuIl19