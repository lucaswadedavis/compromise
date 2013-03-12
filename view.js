$(document).ready(function(){
	controller.load();
	view.listeners();

	if (model.names.length>1){
		view.sort();
		}
	else{
		view.addNewName()
		}
    });

var view={

	listeners:function(){
		
	window.addEventListener('load', function() {
		Array.prototype.forEach.call(document.getElementsByClassName('button'), function(testEl) {
			var teTime;

			testEl.addEventListener('touchend', function(event) {
				teTime = Date.now();
			}, false);
		
			testEl.addEventListener('click', function(event) {
				var cTime = Date.now();
		
				document.getElementById('te-time').value = teTime;
				document.getElementById('c-time').value = cTime;
				document.getElementById('d-time').value = cTime - teTime;
			}, false);

			testEl.addEventListener('click', function() {
				testEl.style.backgroundColor = testEl.style.backgroundColor ? '' : 'YellowGreen';
			}, false)
		});

		new FastClick(document.getElementById('fastclick'));
	}, false);

		$("#submitNewName").live("click",function(){
			
			var input=$("input").val();
			if (input=="" || input==null || input==" " || input==undefined){
				$("input").val("");
				}
			else {
				controller.addName(input);
				view.goTo(view.sort);
				}
			});
			
			
		$("#removeName").live("click",function(){
			view.goTo(view.removeName);
			});
			
		$(".remove").live("click",function(){
			var target=$(this).attr("id");
			controller.removeName(target);
			$(this).slideUp();
			console.log(target);
			});
			
		$("#goToSort").live("click",function(){
			view.goTo(view.sort);
			});
			
		$("#addNewName").live("click",function(){
			view.goTo(view.addNewName);
			});
	},
	
	goTo:function(x){
	$("div#wrapper").fadeOut(function(){
		$("div#wrapper").html(x);
		$("div#wrapper").fadeIn();
		});
	},

	
	projectDeletion:function(){
		var d="";
		for (var i=0;i<model.projects.length;i++){
			d+="<div id='"+model.projects[i].id+"' class='button remove'>delete "+model.projects[i].name+"?</div>";
			}
		$("div#wrapper").html(d);

	},
	
	removeName:function(){
	var d="";
	d+="<h2>remove a few names</h2>";
	for (var i=0;i<model.names.length;i++){
		d+="<div id='"+model.names[i].id+"' class='button remove'>delete "+model.names[i].name+"?</div>";
		}
	d+="<div id='goToSort' class='button'>back to the list!</div>";
	$("div#wrapper").html(d);

	new FastClick(document.getElementById('goToSort'));

	for (var i=0;i<model.names.length;i++){
		new FastClick(document.getElementById(model.names[i].id));
		}
	},
	
	addNewName:function(){
		var d="";
		d+="<h2>Add a Name you Love!</h2>";
		d+="<div><input type='text' id='newName' /></div>";
		d+="<div id='submitNewName' class='button'>add this to the list!</div>";
		d+="<div id='goToSort' class='button'>back to the list!</div>";
		$("div#wrapper").html(d);

	new FastClick(document.getElementById('submitNewName'));
	new FastClick(document.getElementById('goToSort'));

	},


	
	sort:function(){
		var d="";
		d+="<table>";
		d+="<tr>";
		d+="<td id='leftSortable'>";
			d+="<h3>Momma Sorts This List</h2>";
			d+="<ul id='sortable0'>";
			if (model.names.length==0){d+="<li class='small'>Mommy will sort this!</li>";}
			   model.names=model.names.sort(function(a,b){return a.scores[0]-b.scores[0]});
				for (var i=0;i<model.names.length;i++){
					d+="<li id='"+model.names[i].id+"'>"+model.names[i].name+"</li>";
					}
				d+="</ul>";
		d+="</td>";
		d+="<td id='centerCompromise'>";
			d+="<h2>This is the Best Compromise</h2>";
			d+="<ul id='compromise'>";
			if (model.names.length==0){d+="<li class='small'>This will be the compromise.</li>";}
			   model.names=model.names.sort(function(a,b){return a.scoreSum-b.scoreSum});
				for (var i=0;i<model.names.length;i++){
					d+="<li>"+model.names[i].name;
					
					while (model.names.length>(i+1) && model.names[i].scoreSum===model.names[i+1].scoreSum){
						d+=" & "+model.names[i+1].name;
						i++;
						}
					
					d+="</li>";
					}
				d+="</ul>";
		d+="</td>";
		d+="<td id='rightSortable'>";
			d+="<h3>Pappa Sorts This List</h3>";
			d+="<ul id='sortable1'>";
			if (model.names.length==0){d+="<li class='small'>Daddy will sort this!</li>";}
			   model.names=model.names.sort(function(a,b){return a.scores[1]-b.scores[1]});
				for (var i=0;i<model.names.length;i++){
					d+="<li id='"+model.names[i].id+"'>"+model.names[i].name+"</li>";
					}
				d+="</ul>";
		d+="</td>";
		d+="</tr>";
		d+="<tr><td colspan='3'><h2 id='addNewName' class='button fast'>Add Another Name!</h2>";
			d+="<h3 id='removeName' class='button'>Drop Some Names You Like Less</h3>";
		d+="</td></tr>";
		d+="</table>";
		$("div#wrapper").html(d);
        
        $("#sortable0").sortable({axis:"y",update:function(event,ui){
               var  temp=$(this).sortable("toArray");
               controller.updateSums(temp,"user0");
			   model.names=model.names.sort(function(a,b){return a.scoreSum-b.scoreSum});
				$("ul#compromise").fadeOut(function(){
					model.names=model.names.sort(function(a,b){return a.scoreSum-b.scoreSum});
					var d="";
				for (var i=0;i<model.names.length;i++){
					d+="<li>"+model.names[i].name;
					while (model.names.length>(i+1) && model.names[i].scoreSum===model.names[i+1].scoreSum){
						d+=" & "+model.names[i+1].name;
						i++;
						}
					d+="</li>";
					}
					$("ul#compromise").html(d);
					$("ul#compromise").fadeIn();
					});
                }});
		


	
	new FastClick(document.getElementById('addNewName'));
	new FastClick(document.getElementById('removeName'));

        $("#sortable1").sortable({axis:"y",update:function(event,ui){
               var  temp=$(this).sortable("toArray");
			   //console.log(temp);
               controller.updateSums(temp,"user1");
			   model.names=model.names.sort(function(a,b){return a.scoreSum-b.scoreSum});
				$("ul#compromise").fadeOut(function(){
					model.names=model.names.sort(function(a,b){return a.scoreSum-b.scoreSum});
					var d="";
				for (var i=0;i<model.names.length;i++){
					d+="<li>"+model.names[i].name;
					while (model.names.length>(i+1) && model.names[i].scoreSum===model.names[i+1].scoreSum){
						d+=" & "+model.names[i+1].name;
						i++;
						}
					d+="</li>";
					}
					$("ul#compromise").html(d);
					$("ul#compromise").fadeIn();
					});
                }});
		
		
		
	}

}
