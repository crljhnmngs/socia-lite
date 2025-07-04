CREATE VIEW public_profiles AS
SELECT
    user_id,
    "firstName",
    "lastName",
    avatar_url
FROM profiles;