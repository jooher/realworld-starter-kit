function Route(route){
	this.match = route[0].replace(/\//g,"\/").replace(/:\w+/g,"([^\/]+)");
	this.params = route[0].match(/:(\w+)/);
	this.seed = route[1];
}

Route.prototype.fit=function(str){
	const match = str.match(this.match);
	return match && match.reduce(
		(tgt,m,i)=>{tgt[this.params[i]]=m; return tgt},
		Object.assign({},this.seed)
	);
}

export default function(...tuples){
	return (routes => hashstr => {
		hashstr=hashstr.replace(/^#\/*/,"");
		for(let i=0,p; i<routes.length; ++i)
			if(p=routes[i].fit(hashstr))
				return p;
	})(tuples.map(t=>new Route(t)));
}