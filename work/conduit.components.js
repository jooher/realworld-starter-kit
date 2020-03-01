{
	Articles  
	/// feed criteria
		:'articles'
			.d("? $!=(`articles .feed .criteria )api:query; * $!.articles@"
				,'article-preview'.d("! Meta"
					,'A.preview-link'.d("! Title Body; !! (`article .slug)route@href")
				)
			)
			.d("? .articlesCount"
				,'NAV.pagination'.d("* (.articlesCount $limit):pages"
					'page-num'.d("! .num").ui(".criteria.offset=. $!=")
				)
		),

	Meta
	/// author createdAt
		:'article-meta'.d("! Info"
			,'BUTTON.favorite'
				.d("! .favoritesCounter $!=")
				.ui("$!=(`articles .slug `favorite)api:post; $=$!.article")
		),

	Info
	/// author createdAt
		:'info'.d(""
			,'IMG'.d("!! .author.image@src")
			,'username'.d("! .author.username")
			,'date'.d("! .createdAt:date")
		),

	Title
		:'title'.d("! .title"),

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
				.d("$update; ? $!=(`articles .article.slug `comments)api:query; *@ $!.comments; ! Comment")
				.a("Comment($append.comment@.)")

		),

	Comment
		:'comment'.d("! Body Info")
}