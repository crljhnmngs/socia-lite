-- Indexes
CREATE INDEX idx_posts_created_at ON posts(created_at DESC);
CREATE INDEX idx_post_likes_post_user ON post_likes(post_id, user_id);
CREATE INDEX idx_post_likes_post_id ON post_likes(post_id);

DROP POLICY IF EXISTS "Users can view their own likes" ON post_likes;

CREATE POLICY "Authenticated users can view likes" ON post_likes
  FOR SELECT
  USING (auth.role() = 'authenticated');