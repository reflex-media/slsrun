export const normalize = (headers, qs, body) => {
  let input = null;

  if (!headers && qs === null) return input;

  if (qs !== null) input = qs;

  const contentType = headers['Content-Type'] || headers['content-type'];

  if (!contentType) return input;

  /* istanbul ignore else */
  if (contentType.startsWith('application/json')) {
    try {
      input = { ...input, ...JSON.parse(body) };
    } catch (err) {
      throw new Error(
        'Content type defined as JSON but an invalid JSON was provided'
      );
    }
  }

  return input;
};

/**
 * Normalizes handler.event.body and handler.event.queryStringParameters
 * as handler.event.input Object
 */
const normalizeHttpRequest /* istanbul ignore next */ = () => {
  return {
    before: (handler, next) => {
      const { headers, queryStringParameters, body } = handler.event;
      // eslint-disable-next-line no-param-reassign
      handler.event.input = normalize(headers, queryStringParameters, body);
      next();
    },
  };
};

export default normalizeHttpRequest;
