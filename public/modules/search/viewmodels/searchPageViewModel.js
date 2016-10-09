'use strict';

define([
	'knockout',
	'knockback',

	'modules/search/models/searchModel',
	'modules/core/viewmodels/contentItemViewModel',
	'modules/core/viewmodels/contentCollectionViewModel',
	
	'enums/searchTypeEnum',

	'template!modules/profile/templates/contentItem.html',
	
	'components/fileOverlay/binding'
],
function(ko, kb, SearchModel, ContentItemViewModel, ContentCollectionViewModel, SearchTypeEnum){
	return kb.ViewModel.extend({
		constructor: function(){
			this.SearchTypeEnum = SearchTypeEnum;

			this.model = ko.observable(new SearchModel());
			this.term = kb.observable(this.model(), 'term');
			this.previousSearchTerm = '';
			
			this.selectedFile = ko.observable();
			this.showFileOverlay = ko.observable(false);
			this.selectedSearchType = ko.observable(SearchTypeEnum.Files);

			this.collectionsResults = kb.collectionObservable(this.model().get('collections'), {view_model: ContentCollectionViewModel});
			this.dirsResults = kb.collectionObservable(this.model().get('dirs'), {view_model: ContentItemViewModel});
			this.filesResults = kb.collectionObservable(this.model().get('files'), {view_model: ContentItemViewModel});
			this.tagsResults = kb.collectionObservable(this.model().get('tags')/*, {view_model: ContentTagViewModel}*/);

			this.activeSearchTypeList = ko.computed(function(){
				var list = [], type = this.selectedSearchType();
				switch(type){
					case SearchTypeEnum.Files:
						list = this.filesResults();
						break;
					case SearchTypeEnum.Dirs:
						list = this.dirsResults();
						break;
					case SearchTypeEnum.Collections:
						list = this.collectionsResults(); 
						break;
					case SearchTypeEnum.Tags:
						list = this.tagsResults(); 
						break;	
				}

				return list;
			}, this);
		},

		// TODO: this is repeated in the code, content list needs to be component-ized
		onDirClick: function(vm, e){
			e.stopPropagation();
			vm.collapsed( !vm.collapsed.peek() );
		},

		onFileClick: function(vm, e){
			this.selectedFile(vm);
			this.showFileOverlay(true);
		},

		onSeachClick: function(){
			//TODO: add loading mask
			var term = this.term.peek().toLowerCase().trim();
			if(term === '' || this.previousSearchTerm === term) return;

			this.collectionsResults.collection().reset();
			this.dirsResults.collection().reset();
			this.filesResults.collection().reset();

			this.model().fetchSearch(term, this.selectedSearchType.peek());
		},

		onSearchTypeClick: function(type, vm, e){
			this.selectedSearchType(type);	

			var term = this.term.peek().trim();
			var list = this.activeSearchTypeList();

			if(list && list.length === 0 &&  term != ''){
				this.model().fetchSearch(term, type);
			}		
		}
	});
});