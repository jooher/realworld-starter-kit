export default{
	
 Articles
/// feed criteria
	:'articles'
	.d("? $!=(`articles .feed .criteria )api:query; * $!.articles@"
		,'preview'.d("! Info Fav"
			,'A.preview-link'.d("! Title Body; !! (`article .slug)nav@href")
		)
	)
	.d("? .articlesCount"
		,'NAV.pagination'.d("* (.articlesCount $limit):pages"
			,'page-num'.d("! .num").ui(".criteria.offset=. $!=")
		)
	)

,Title
	:'H2.title'.d("! .title")

,Body
	:'body'.d("! .body")

,Info
/// author createdAt
	:'info'.d(""
		,'A.userimg'.d("!! .author.image@href"
			,'IMG'.d("!! .author.image@src")
		)
		,'A.username'.d("!! .author.username@ (`@ .author.username)nav@href")
		,'date'.d("! .createdAt:date")
	)
	
,Fav
	:'BUTTON icon=favorite'
		.d("! .favoritesCount; $!=")
		.ui("$!=(@POST `articles .slug `favorite)api:query; $=$!.article")
	
,Meta
/// author createdAt
	:'meta'.d("! Info; Follow( .author@. )"
			
		,'BUTTON icon=favorite `Favorite article'
			.d("! .favoritesCount:brackets $!=")
			.ui("$!=(@POST `articles .slug `favorite)api:query; $=$!.article")
	)
	
,Follow
/// profile.
	:'BUTTON icon=add'
		.d("$following=.; ! (($following `Unfollow `Follow)?! .username)spaced")
		.ui("$following=(@POST `profiles .author.username ($following `unfollow `follow)?!)api:query")

,UserInfo
/// profile.
	:'user-info'.d(""
		,'IMG.user'.d("!! .image@src")
		,'H4'.d("! .username")
		,'bio'.d("! .bio")
		,"! Follow"
	)

,Comments
/// user slug
	:'comments'.d("$append="

		,'FORM.comment'.d(""
			,'TEXTAREA placeholder="Write a comment..." rows="3"'.d("")
			,'IMG.user'.d("!! .user.image@src")
			,'BUTTON `Post comment'
			.ui("? $user $user=Signin():wait; $append=( (($body)@comment)@POST `articles .slug `comment )api:query")
		)

		,'comments'
			.d("$append; ? $!=(`articles .slug `comments)api:query; *@ $!.comments; ! Comment")
			.a("Comment($append.comment@.)")

	)

,Comment
	:'comment'.d("! Body Info")
	
,Signin
	:'FORM.signin'.d(""
			,'INPUT placeholder="Your Name"'.d("")
			,'INPUT placeholder="Email"'.d("")
			,'INPUT placeholder="Password" type=password'.d("")
			,'BUTTON `Sign in'.ui("$!=(#.form:grab@POST `users `login)api:query; ? $user=$!.user")
		).u("value $user")
	
}