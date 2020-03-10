/*
'ASIDE.tags'.d("? $!=(`tags)uri:query; * $!.tags@tag"
	,'A'.d("!! .tag@ (`tags .tag)concat@href")
)*/

'SECTION'.d("! $q=`que; ! $q"
	,'H1 `hello'.d("! `Title $q")
	,"! `inner- $q" //
	,'H2'.d("! `H2- $q")
)
.COMPILE()
.RENDER()