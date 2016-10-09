'use strict';

define([
	'backbone', 'bbr',
	'modules/core/models/contentItemModel',
	'modules/core/models/contentCollectionModel',
	
	'modules/core/collections/contentItemCollection',
	'modules/core/collections/contentCollection',
	'enums/searchTypeEnum'
],
function(Backbone, bbr, ContentItemModel, ContentCollectionModel, ContentItemCollection, ContentCollection, SearchTypeEnum){
	var SearchModel = Backbone.RelationalModel.extend({
		url: '/api/search',

		defaults: {
			term: '',
			tags: []
		},

		relations: [{
			type: Backbone.HasMany,
			key: 'files',
			relatedModel: ContentItemModel,
			collectionType: ContentItemCollection
		},{
			type: Backbone.HasMany,
			key: 'collections',
			relatedModel: ContentCollectionModel,
			collectionType: ContentCollection
		}/*,{
			type: Backbone.HasMany,
			key: 'dirs',
			relatedModel: ContentItemModel,
			collectionType: ContentItemCollection
		},{
			type: Backbone.HasMany,
			key: 'tags',
			relatedModel: ContentItemModel,
			collectionType: ContentItemCollection
		}*/],

		fetchSearch: function(term, type){
			return this.fetch({
				silent: true,
				url: this.url + '/' + (type || SearchTypeEnum.Files) + '/' + term,
				wait: true
			})
			.then(function(resp){
				this.get(type).reset(resp);
			}.bind(this))
			.fail(function(){
				console.log('get search failed');
				debugger
			});
		}
	});

	return App.Utils.ns(App, 'Search.Models.SearchModel', SearchModel);
});