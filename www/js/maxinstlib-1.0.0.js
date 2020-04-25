var maxinstlib = (function() {
    'use strict';
	
	var appName = 'myreportlabor';

	var key = {
		user: 'maxinst-' + appName + '-user',
		token: 'maxinst-' + appName + '-token',
		language: 'maxinst-' + appName + '-language',
		endpoint: 'maxinst-' + appName + '-endpoint',
		asset: 'maxinst-' + appName + '-asset'
	};
	
	
	
	var	oslc = {
		
		login: function(args) {
			return database.endpoint.get() + '/oslc/whoami';
		},
		
		asset: function(args) {
			
			var url = database.endpoint.get();
			url += '/oslc/os/mxasset?ignorecollectionref=1&lean=1' +
			       '&oslc.select=assetnum,description,rel.location{location,description}' +
				   '&oslc.where=status="OPERATING"' +
				   '&oslc.pageSize=100';
					
			if(args!=null) {
				url += ' ' + args;
			}
					
			return url;
			
		}
	};		

	function getRequest(url,token) {		
		var http;
		var _return;
		console.log(token)
		//fetch(url, {
		//	method: 'GET',
		//	//mode: 'no-cors', // pode ser cors ou basic(default)
		//	//redirect: 'follow',
		//	headers: new Headers({
		//	  //'Content-Type': 'application/json',
		//	  'maxauth': token
		//	})
		//}).then((response) => {
		//		console.log(response.status)
		//		if (response.status == 200){
		//			//throw new Error('Olha a merda do error e o status' + response.status)
		//			console.log(response.text)
		//			_return = response.text
		//		} else {
		//			_return = response.statusText
		//		}
		//
		//}).catch((error) => {
		//	console.error(error.message)
		//});

		try {
			http = new XMLHttpRequest();                
			http.open('GET', url, false);
			if(token!=null) {
				http.setRequestHeader('maxauth', token)
			};
			http.onload = function (e) {
				if (http.readyState === 4) {
					if (http.status === 200) {
						_return = http.responseText;
					} else {
						_return = http.statusText;
					}
				}
			};
			http.onerror = function (e) {
				console.log(e);
			};
			
			http.send();
			return _return;
		
		}
		catch(e) {
			console.log(e);
		}
	
	}
	
	function setRequest(url,token,args) {

		var http;
		var _return;
		try {
			http = new XMLHttpRequest();
			http.open('POST', url);
			http.setRequestHeader('Content-Type', 'application/json');
			http.setRequestHeader('x-method-override', 'PATCH');
			http.setRequestHeader('PATCHTYPE', 'MERGE');
			http.setRequestHeader('maxauth', token);
			http.onload = function (e) {
				if (http.readyState === 4) {
					if (http.status === 200) {
						_return = http.responseText;
					} else {
						_return = http.statusText;
					}
				}
				
			};
			http.onerror = function (e) {
				console.log(e);
			};
			http.send(args);
			return _return;
		}
		catch(e) {
			console.log(e);
		}	
		
	}

	var database = {
		
		endpoint: {
			
			get: function() {
				return localStorage.getItem(key.endpoint); 
			},
			set: function(args) {
				localStorage.setItem(key.endpoint,args);
			},
			delete: function() {
				localStorage.removeItem(key.endpoint);
			}
			
		},
		
		user: {
			
			get: function() {
				return localStorage.getItem(key.user); 
			},
			set: function(args) {
				localStorage.setItem(key.user,args);
			},
			delete: function() {
				localStorage.removeItem(key.user);
			}
			
		},
		
		language: {
			
			get: function() {
				return localStorage.getItem(key.language); 
			},
			set: function(args) {
				localStorage.setItem(key.language,args);
			},
			delete: function() {
				localStorage.removeItem(key.language);
			}
			
		},
		
		token: {
			
			get: function() {
				return localStorage.getItem(key.token); 
			},
			set: function(args) {
				localStorage.setItem(key.token,args);
			},
			delete: function() {
				localStorage.removeItem(key.token);
			}
			
		},
		
		asset: {
			
			get: function() {
				return localStorage.getItem(key.form); 
			},
			set: function(args) {
				localStorage.setItem(key.form,args);
			},
			delete: function() {
				localStorage.removeItem(key.form);
			}
			
		}
		
	}


	
	
	/*
	Commons
	*/	
	function isUrlValid(args) {
		try {
			new URL(args);
			return true;
		} catch (e) {
			return false;  
		}			
	}
	
	function getUrlFormat(args) {
		var symbol = args.substring((args.length-1),args.length);
		if(symbol=='/') {
			return args.substring(0,(args.length-1));
		}
		else {
			return args;
		}
	}
	
	function isOnline() {
        return navigator.connection.type != Connection.NONE;
    }

    function base64(str) {
        return btoa(encodeURIComponent(str).replace(
                /%([0-9A-F]{2})/g, function(match, p1) {
                    return String.fromCharCode('0x' + p1);
                }));
    }	

	return {

		
		model: {
			
			endpoint: {
				
				get: function() {
					return database.endpoint.get();
				},
				
				set: function(args) {
					database.endpoint.set(args);
				},
				
				delete: function() {
					database.endpoint.delete();
				}				
				
			},
			
			user: {
				
				get: function() {
					return database.user.get();					
				},
				set: function(args) {
					database.user.set(args);
				},
				delete: function() {
					database.user.delete();
				}
				
			},
			
			token: {
				
				get: function() {
					return database.token.get();					
				},
				set: function(args) {
					database.token.set(args);
				},
				delete: function() {
					database.token.delete();
				}
				
			},
			
			asset: {
				
				get: function() {
					return database.asset.get();					
				},
				set: function(args) {
					database.asset.set(args);
				},
				delete: function() {
					database.asset.delete();
				}				
			}
			
		},
		
		event: {
			
			authorization: function(args) {
	
				try {
					var token = base64(args.user+':'+args.pass);
					var data = getRequest(oslc.login(null),token);
					if(data!=null && data !='Unauthorized') {
						var json = JSON.parse(data);
						database.user.set(json['spi:userName']);
						database.language.set(json['langcode']);
						database.token.set(token);
						return true;
					}
					else {
						return false;
					}
				}	
				catch(e) {
					console.log(e);
					return false
				}
			},
			
			logout: function() {
				database.user.delete();
				database.language.delete();
				database.token.delete();			
			},
			
			download: function() {
				
				try {
					var data = getRequest(oslc.asset(null), database.token.get());					
					if(data!=null) {				
						database.asset.set(data);						
					}					
				}
				catch(e) {
					console.log(e);
				}				
			}
			
		}

		
	}
	
}());