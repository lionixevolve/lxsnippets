How to change  a Wordpress site url:

  UPDATE wp_options SET option_value="http://www.lionix.com" WHERE option_name = "home";
  UPDATE wp_options SET option_value="http://www.lionix.com" WHERE option_name = "siteurl";

  UPDATE wp_posts SET guid = replace(guid, 'http://localhost/lionix','http://www.lionix.com');
  UPDATE wp_posts SET post_content = replace(post_content, 'http://localhost/lionix','http://www.lionix.com');
  UPDATE wp_postmeta SET meta_value = replace(meta_value,'http://localhost/lionix','http://www.lionix.com');

