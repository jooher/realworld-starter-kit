{


	Articles:
	// feed criteria
		'articles'
			.d("? $!=(`articles .feed .criteria )api:query; * $!.articles@"
				,'article-preview'.d("Meta( .author .createdAt@date )"
					,'A.preview-link'.d("! Title Body; !! (`article .slug)route@href")
				)
			)
			.d("? .articlesCount"
				,'NAV.pagination'.d("* (.articlesCount $limit):pages"
					'page-num'.d("! .num").ui(".criteria.offset=. $!=")
				)
		),

	Meta:
	// author createdAt
		'article-meta'.d(""
			,'info'.d(""
				,'IMG"'.d("!! .author.image@src")
				,'username'.d("! .author.username")
				,'date'.d("! .date:date")
			)
			,'BUTTON.favorite'
				.d("! .favoritesCounter $!=")
				.ui("$!=(`articles .slug `favorite)api:post; $=$!.article")
		),

	Title:
		'title'.d("! .title"),

	Body:
		'body'.d("! .body"),


}