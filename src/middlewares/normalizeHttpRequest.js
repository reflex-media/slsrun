function normalize(headers, qs, body) {
  var input = null;

  if (!headers && qs === null) return input;

  if (qs !== null) input = qs;

  var contentType = headers["Content-Type"] || headers["content-type"];

  if (!contentType) return input;

  /* istanbul ignore else */
  if (contentType.startsWith("application/json")) {
    try {
      input = Object.assign({}, input, JSON.parse(body));
    } catch (err) {
      throw new Error("Content type defined as JSON but an invalid JSON was provided");
    }
  }

  return input;
}

/**
 * Normalizes handler.event.body and handler.event.queryStringParameters
 * as handler.event.input Object
 */
function normalizeHttpRequest /* istanbul ignore next */() {
  return {
    before: (handler, next) => {
      const { headers, queryStringParameters, body } = handler.event;
      // eslint-disable-next-line no-param-reassign
      handler.event.input = normalize(headers, queryStringParameters, body);
      next();
    },
  };
}

module.exports = normalize;
module.exports = normalizeHttpRequest;
