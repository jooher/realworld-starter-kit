import dict from "/dict.dap.js";
import components from "/components.dap.js";
import router from "/route.js";

const

	route = values => values.reverse().join("/").replace(/\/(?=[@?])/g,""),
	unroute = router(
		["tag/:tag", {page:""}],
		["article/:slug", {page:"article"}],
		["@:username/:feed", {page:"profile"}],
		[":page",{}]
	),
	
	dictFromHtmlElements = elems=> Object.assign({}, ...elems.map(el=>({[el.id||el.tagName]:el})));

// Here's the app	
	
'APP.conduit'.d("$page= $user= $article="

	,'NAV'
		.d("* links.nav"
			,'A'.d("!? .nav@; !! (.nav)nav@href")
		)
		
	//,'H1 `Page:'.d("! $page")
	
	,'PAGE.home `Home'
	///
	.d("? $page:!; ! html.HEADER"

		,'feed-toggle'.d(""
			,'A.yourfeed `Your feed'.d("? .username; !! (`@ .username `feed)nav@href")
			,'A.globalfeed href="/#/" `Global feed'.d()
		)

		,"Articles( .feed (.tag)uri@criteria )"

		,'ASIDE.tags'.d("? $!=(`tags)api:query; * $!.tags@tag"
			,'A'.d("!! .tag@ (`tag .tag)nav@href")
		)

	)

	,'PAGE.article `Article'
	/// article.
	.d("?? $page@article; ? $!=(`articles .slug)api:query; *@ $!.article" 

		,'banner'.d("! Title Meta")

		,"! Body Meta; Comments( .slug )"
	)

	,'PAGE.profile'
	/// user.
	.d("?? $page@profile; ! UserInfo" // $!=(`profile $user.username)api:query;

		,'feed'.d("$toggle=`my $criteria=(.username@author)uri"

			,'articles-toggle'.d("* toggle :split`my,favorited"
				,'A	`My articles'.d("!! (`@ .username)nav@href")
				,'A `Favorites'.d("!! (`@ .username `favorites)nav@href")
				.d("!? .toggle@; a")
				.a("!? (.toggle $toggle)eq@selected")
				.ui("$criteria=")
			)
			
			,"Articles( (.favorites:? (.username@author)uri (.username@favorited)uri )?!@criteria )"
		)

	)

	,'PAGE.editor'
	/// user
	.d("?? $page@editor"
		,'H1 `New Post'.d()
		,'FORM'.d(""
			,'INPUT placeholder="Article Title" type="text"'.d("")
			,'INPUT placeholder="What is this article about?" type="text"'.d("")
			,'TEXTAREA placeholder="Write your article (in markdown)" rows="8"'.d("")
			,'INPUT placeholder="Enter tags" type="text"'.d("")
			,'tag-list'.d("")
			,'BUTTON.publish-article `Publish'.ui("")
		)
	)

	,'PAGE.auth'
	.d("?? $page@auth; $error="
		,'H1 `Signup'.d("")
		,'A `Have an account?'.d("")
		,'UL.error-messages*'.d("* $error"
			,'LI'.d("! .error")
		)
		,'FORM'.d(""
			,'INPUT placeholder="Your Name"'.d("")
			,'INPUT placeholder="Email"'.d("")
			,'INPUT placeholder="Password" type="password"'.d("")
			,'BUTTON.signup `Sign up'.ui("! `signup")
		)
	)

	,'PAGE.settings'
	.d("?? $page@settings"
		,'H1 `Your Settings'.d("")
		,'FORM'.d(""
			,'INPUT type="text" placeholder="URL of profile picture"'.d("")
			,'INPUT type="text" placeholder="Your Name"'.d("")
			,'TEXTAREA rows="8" placeholder="Short bio about you"'.d("")
			,'INPUT type="text" placeholder="Email"'.d("")
			,'INPUT type="password" placeholder="Password"'.d("")
			,'BUTTON.update-settings `Update'.ui("")
		)
	)

).e('HASHCHANGE',"& :unroute; $page=.")

.DICT(
	dict,
	components,
	{ html : dictFromHtmlElements([...document.getElementById("html").children]) }
)

.FUNC({
	flatten:{
		nav: values => "/#/"+route(values),
		api: values => "https://conduit.productionready.io/api/"+route(values),
	},
	convert:{
		split: str=>str.split(","),
		date: utc => new Date(utc).toDateString(),
		pages: $ => Array .from({length:Math.ceil($.pagesCount/$.limit)}) .map(num=>({num,offset:num*$.limit})),
		
		unroute: (dummy,r) => r && unroute(location.hash)
	}
})

.COMPILE()
.RENDER()