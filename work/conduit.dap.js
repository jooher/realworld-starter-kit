dap &&

'APP.conduit'.d("$page= $user= $article="

	,'NAV'
		.d("* links.nav"
			,'A'.d("!? .nav@ (.nav)route@href")
		)
		.d(""
			,'A.signup href="sign up"'.ui("")
		)


	'PAGE.home'
	///
	.d("$feed= $tag=. $offset=. $limit=."

		,'feed-toggle'.d(""
			,'A.yourfeed'.ui("$feed=`feed")
			,'A.localfeed'.ui("$feed=")
		)

		"Articles( $feed ($tag)@criteria )"

		,'ASIDE.tags'.d("? $!=(`tags)api:query; * $!.tags@tag"
			,'A'.d("!! .tag@ (`tags .tag)route@href")
		)

	)


	,'PAGE.article'
	/// article.
	.d("?? $page@article; *@ $article.article" //? $!=(`articles $article.slug@)api:query;

		,'banner'.d("! Title Meta")

		,"! Body Meta; Comments( .slug )"
	)

	,'PAGE.profile'
	/// user.
	.d("! UserInfo" // $!=(`profile $user.username)api:query;

		,'feed'.d("$toggle=`my $criteria=(.username@author)uri"

			,'articles-toggle'.d("*@toggle :split.comma`my,favorited"
				,'A'
				.d("!? .toggle@; a")
				.a("!? (.toggle $toggle)eq@selected")
				.ui("$criteria=($toggle (.username@author)uri@my (.username@favorited)uri@favorited )case")
			)
			,"Articles( $criteria )"
		)

	)

	,'PAGE.editor'
	/// user
	.d(""
		,'FORM'.d(""
			,'INPUT placeholder="Article Title" type="text"'.d("")
			,'INPUT placeholder="What is this article about?" type="text"'.d("")
			,'TEXTAREA placeholder="Write your article (in markdown)" rows="8"'.d("")
			,'INPUT placeholder="Enter tags" type="text"'.d("")
			,'tag-list'.d("")
			,'BUTTON.publish-article'.ui("")
		)
	)

	,'PAGE.auth'
	.d(""
		,'H1 `Signup'.d("")
		,'A `Have an account?'.d("")
		,'UL.error-messages*'.d("* $error"
			,'LI'.d("! .error")
		)
		,'FORM'.d(""
			,'INPUT placeholder="Your Name"'.d("")
			,'INPUT placeholder="Email"'.d("")
			,'INPUT placeholder="Password" type="password"'.d("")
			,'BUTTON.signup `Sign up'.ui()
		)
	)

	,'PAGE.settings'
	.d(""
		,'H1 `Your Settings'.d("")
		,'FORM'.d(""
			,'INPUT type="text" placeholder="URL of profile picture"'.d("")
			,'INPUT type="text" placeholder="Your Name"'.d("")
			,'TEXTAREA rows="8" placeholder="Short bio about you"'.d("")
			,'INPUT type="text" placeholder="Email"'.d("")
			,'INPUT type="password" placeholder="Password"'.d("")
			,'BUTTON.update-settings'.ui("")
		)
	)

)

.FUNC({
	flatten:{
		api: values => values.filter( v => v!=null ).join("/").replace( "/?","?") //
	},
	convert:{
		date: utc => new Date(utc).toDateString(),
		pages: $ => Array.from({length:Math.ceil($.pagesCount/$.limit}).map(num=>{num,offset:num*$.limit})
			
		}
	}
})