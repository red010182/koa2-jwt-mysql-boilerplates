module.exports = function getToken(ctx) {
  const { authorization = '' } = ctx.request.header;
  const [, token] = authorization.match(/^Bearer\s(\S*)$/i) || [];
  return token;
};
