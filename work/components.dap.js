export default{
	
Articles
/// feed criteria
:'articles'
	.d("? $!=(`articles .feed .criteria )api:query; * $!.articles@"
		,'article-preview'.d("! Meta"
			,'A.preview-link'.d("! Title Body; !! (`article .slug)nav@href")
		)
	)
	.d("? .articlesCount"
		,'NAV.pagination'.d("* (.articlesCount $limit):pages"
			,'page-num'.d("! .num").ui(".criteria.offset=. $!=")
		)
	),

Meta
/// author createdAt
	:'article-meta'.d("! Info"
		,'BUTTON.favorite'
			.d("! .favoritesCount $!=")
			.ui("$!=(`articles .slug `favorite)api:post; $=$!.article")
	),

Info
/// author createdAt
	:'info'.d(""
		,'A.userimg'.d("!! .author.image@href"
			,'IMG'.d("!! .author.image@src")
		)
		,'A.username'.d("!! .author.username@ (`@ .author.username)nav@href")
		,'date'.d("! .createdAt:date")
	),

Title
	:'H2.title'.d("! .title"),

Body
	:'body'.d("! .body"),

UserInfo
/// user
	:'user-info'.d("*@ .user"
		,'IMG.user'.d("!! .image@src")
		,'H4'.d("! .username")
		,'bio'.d("! .bio")
		,'BUTTON.follow'.d("! .username").ui("")
	),

Comments
/// user article
	:'comments'.d("$append="

		,'FORM.comment-form'.d(""
			,'TEXTAREA placeholder="Write a comment..." rows="3"'.d("")
			,'IMG.user'.d("!! .user.image@src")
			,'BUTTON.post-comment `Post'.ui("$append=( (`articles .article.slug `comment)api@url (($body)@comment) )post")
		)

		,'comments'
			.d("$append; ? $!=(`articles .article.slug `comments)api:query; *@ $!.comments; ! Comment")
			.a("Comment($append.comment@.)")

	),

Comment
	:'comment'.d("! Body Info")
	
}