import dict from "/dict.dap.js";
import components from "/components.dap.js";
import router from "/route.js";

const

	api = "https://conduit.productionready.io/api/",
	
	headers = {
		"Content-Type": "application/json",
		"charset":"utf-8"
	},
	
	route = values => values.reverse().join("/").replace(/(?<=[@?])\//g,""),
	
	unroute = router(
		["tag/:tag", {page:""}],
		["article/:slug", {page:"article"}],
		["@:username", {page:"profile"}],
		["@:username/:feed", {page:"profile"}],
		[":page",{}]
	),
	

	dictFromHtmlElements = elems=> Object.assign({}, ...elems.map(el=>({[el.id||el.tagName]:el})));

	
'APP.conduit'.d("$page= $user= $article=; u @HASHCHANGE"

	,'ROOF'.d(""
	
		,'A.logo href=/#/'.d()//.d("!? .nav@; !! (.nav)nav@href")
		
		,'NAV'
			.d("? $user"
				,'A icon=create href=/#/editor `Create article'.d("!? ($page `editor)eq@selected")
				,'A icon=settings href=/#/settings `Settings'.d("!? ($page `settings)eq@selected")
				,'A'.d("!! $user.username (`@ $user.username)nav@href")
			)
			.d("? $user:!"
				,'A icon=person href=/#/signin `Sign In'.d("!? ($page `signin)eq@selected")
				,'A icon=person_add href=/#/signup `Sign Up'.d("!? ($page `signup)eq@selected")
			)
	)

	//,'H1 `Page:'.d("! $page")
	
	,'PAGE.home'
	///
	.d("? $page:!; ! html.HEADER"

		,'feed-toggle'.d(""
			,'A `Your feed'.d("? .username; !! (`@ .username `feed)nav@href")
			,'A href="/#/" `Global feed'.d()
		)

		,"Articles( .feed (.tag)uri@criteria )"

		,'ASIDE.tags'.d("? $!=(`tags)api:query; * $!.tags@tag"
			,'A'.d("!! .tag@ (`tag .tag)nav@href")
		)

	)

	,'PAGE.article'
	/// article.
	.d("?? $page@article; ? $!=(`articles .slug)api:query; *@ $!.article" 

		,'HEADER'.d("! Title Meta")

		,"! Body Meta; Comments( .slug )"
	)

	,'PAGE.profile'
	/// user.
	.d("?? $page@profile; ? $!=(`profiles .username)api:query; *@ $!.profile"

		,'HEADER'.d("! UserInfo")
		
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
			,'BUTTON `Publish'.ui("")
		)
	)

	,'PAGE.signup'
	.d("?? $page@signup; $error="
		,'H1 `Signup'.d("")
		,'A `Have an account?'.d("")
		,'UL.error-messages*'.d("* $error"
			,'LI'.d("! .error")
		)
		,'FORM'.d(""
			,'INPUT placeholder="Your Name"'.d("")
			,'INPUT placeholder="Email"'.d("")
			,'INPUT placeholder="Password" type=password'.d("")
			,'BUTTON `Sign up'.ui("")
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
			,'BUTTON `Update'.ui("")
		)
	)

).e('HASHCHANGE',"& :unroute; log $page=.")

.DICT(
	dict,
	components,
	{ html : dictFromHtmlElements([...document.getElementById("html").children]) }
)

.FUNC({
	flatten:{
		nav: values => "/#/"+route(values),
		api: (values,names) => {
			const
				method = names[names.length-1],
				body = method && values.pop(),
				url = api+route(values);
			return method ? {method,headers,url,body} : url;
		}
	},
	convert:{
		split: str=>str.split(","),
		date: utc => new Date(utc).toDateString(),
		brackets: txt => '('+txt+')',
		
		grab: form=>form&&Object.assign({}, ...form.elements.map( el => el.name&&{[el.name]:el.value})),
		
		pages: $ => Array .from({length:Math.ceil($.pagesCount/$.limit)}) .map(num=>({num,offset:num*$.limit})),
		
		unroute: (dummy,r) => r && unroute(location.hash)
	}
})

.COMPILE()
.RENDER()