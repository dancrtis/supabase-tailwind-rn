require "jwt"

key_file = "./AuthKey_XXXXX.p8"
team_id = "abc123"
client_id = "app.com.your-service-name"
key_id = "XXXXX"

validity_period = 180 # In days. Max 180 (6 months) according to Apple docs.

private_key = OpenSSL::PKey::EC.new IO.read key_file

token = JWT.encode(
    {
        iss: team_id,
        iat: Time.now.to_i,
        exp: Time.now.to_i + 86400 * validity_period,
        aud: "https://appleid.apple.com",
        sub: client_id
    },
    private_key,
    "ES256",
    header_fields=
    {
        kid: key_id
    }
)
puts token
