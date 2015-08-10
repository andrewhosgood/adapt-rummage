define(
    function( require ) {
        var ComponentView = require( 'coreViews/componentView' ),
                Adapt = require( 'coreJS/adapt' ),
                RummageCore = require( 'components/adapt-rummage/js/rummage' ),
                Rummage = ComponentView.extend(
                    {
                        events: {
                            'click .rummage-search-pool-item': 'toggleItemDetails'
                        },
                        preRender: function() {
                            this.$el.addClass( 'no-state' );

                            // Checks to see if the blank should be reset on revisit
                            this.checkIfResetOnRevisit();

                            Handlebars.registerHelper( 'lowerCase',
                                function( str ) {
                                    return str.toLowerCase();
                                }
                            );
                        },
                        postRender: function() {
                            var intComponentID = this.model.attributes._id,
                                    jqoSearchField = this.$( '#rummage-search-field-' + intComponentID ),
                                    jqoSearchPool = this.$( '#rummage-search-pool-' + intComponentID );

                            jqoSearchField.rummage( jqoSearchPool,
                                {
                                    results: '#rummage-search-results-' + intComponentID,
                                    total: '#rummage-search-pool-total-' + intComponentID
                                }
                            ).on( 'keydown keyup',
                                function( e ) {
                                    e.stopPropagation();
                                }
                            /*),
                            jqoSearchPool.on( 'change', ':checkbox',
                                function() {
                                    var jqoThisCheckbox = $( this ),
                                            jqoThisClosestLabel = jqoThisCheckbox.closest( 'label' );

                                    if( jqoThisCheckbox.is( ':checked' ) ) {
                                        jqoThisClosestLabel.addClass( 'selected' );
                                    } else {
                                        jqoThisClosestLabel.removeClass( 'selected' );
                                    }
                                }*/
                            );

                            this.$( '.component-inner' ).on( 'inview', _.bind( this.inview, this ) );

                            this.setReadyStatus();
                        },
                        // Used to check if the blank should reset on revisit
                        checkIfResetOnRevisit: function() {
                            var isResetOnRevisit = this.model.get( '_isResetOnRevisit' );

                            // If reset is enabled set defaults
                            if( isResetOnRevisit ) {
                                this.model.reset( isResetOnRevisit );
                            }
                        },
                        toggleItemDetails: function( e ) {
                            $( e.currentTarget ).next( '.rummage-search-pool-item-details' ).stop( true ).slideToggle().closest( 'li' ).siblings().find( '.rummage-search-pool-item-details' ).stop( true ).slideUp();
                        },
                        inview: function( event, visible, visiblePartX, visiblePartY ) {
                            if( visible ) {
                                if( visiblePartY === 'top' ) {
                                    this._isVisibleTop = true;
                                } else if( visiblePartY === 'bottom' ) {
                                    this._isVisibleBottom = true;
                                } else {
                                    this._isVisibleTop = true;
                                    this._isVisibleBottom = true;
                                }

                                if( this._isVisibleTop
                                        && this._isVisibleBottom ) {
                                    this.$( '.component-inner' ).off( 'inview' );
                                    this.setCompletionStatus();
                                }
                            }
                        }
                    }
                );

        Adapt./*on( 'configModel:dataLoaded',
            function( view ) {
                console.log( 'Triggered when the config model is loaded. This can be used to stop the course files from being fetched.' );
            }
        ).on( 'configModel:loadCourseData',
            function( view ) {
                console.log( 'Triggered just before Adapt creates the main content collections and models. This can be used to load the course files if a plugin has stopped the default fetch.' );
            }
        ).on( 'app:dataReady',
            function( view ) {
                console.log( 'Triggered when all the course data is loaded.' );
            }
        ).on( 'adapt:initialize',
            function( view ) {
                console.log( 'Triggered when adapt is ready to start the router.' );
            }
        ).on( 'router:menu',
            function( view ) {
                console.log( 'Triggered when a route hits a menu.' );
            }
        ).on( 'router:page',
            function( view ) {
                console.log( 'Triggered when a route hits a page.' );
            }
        ).on( 'remove',
            function( view ) {
                console.log( 'Is used by Adapt to trigger an event to remove all views.' );
            }
        ).on( 'device:resize',
            function( view ) {
                console.log( 'Triggered when the window resizes.' );
            }
        ).on( 'device:changed',
            function( view ) {
                console.log( 'Triggered when the device size changes.' );
            }
        ).on( 'menuView:preRender',
            function( view ) {
                console.log( 'Triggered when a menuView has initialized.' );
            }
        ).on( 'menuView:postRender',
            function( view ) {
                console.log( 'Triggered when a menuView has rendered.' );
            }
        ).on( 'pageView:preRender',
            function( view ) {
                console.log( 'Triggered when a pageView has initialized.' );
            }
        ).on( 'pageView:postRender',
            function( view ) {
                console.log( 'Triggered when a pageView has rendered.' );
            }
        ).on( 'pageView:ready',
            function( view ) {
                console.log( 'Triggered when all the assets are loaded for a page.' );
            }
        ).on( 'articleView:preRender',
            function( view ) {
                console.log( 'Triggered when a articleView has initialized.' );
            }
        ).on( 'articleView:postRender',
            function( view ) {
                console.log( 'Triggered when a articleView has rendered.' );
            }
        ).on( 'blockView:preRender',
            function( view ) {
                console.log( 'Triggered when a blockView has initialized.' );
            }
        ).on( 'blockView:postRender',
            function( view ) {
                console.log( 'Triggered when a blockView has rendered.' );
            }
        ).on( 'componentView:preRender',
            function( view ) {
                console.log( 'Triggered when a componentView has initialized.' );
            }
        ).on( 'componentView:postRender',
            function( view ) {
                console.log( 'Triggered when a componentView has rendered.' );
            }
        ).on( 'navigationView:preRender',
            function( view ) {
                console.log( 'Triggered when the navigationView has initialized.' );
            }
        ).on( 'navigationView:postRender',
            function( view ) {
                console.log( 'Triggered when the navigationView has rendered.' );
            }
        ).on( 'questionView:showFeedback',
            function( view ) {
                console.log( 'Triggered when a question shows feedback. Question View automatically sets up feedbackTitle and feedbackMessage as attributes on the currentView.model.' );
            }
        ).on( 'questionView:disabledFeedback',
            function( view ) {
                console.log( 'Triggered when a question is meant to show feedback but _canShowFeedback is disabled on the model.' );
            }
        ).on( 'navigation:backButton',
            function( view ) {
                console.log( 'Triggered when the menu button is pressed.' );
            }
        ).on( 'navigation:toggleDrawer',
            function( view ) {
                console.log( 'Triggered when the Drawer toggle button is clicked.' );
            }
        ).*/register( 'rummage', Rummage );

        return Rummage;
    }
);