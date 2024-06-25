function generateAccessToken(username) {
    return jwt.sign({ username }, token_secret, { expiresIn: '10800s' });
}
module.exports = {generateAccessToken}