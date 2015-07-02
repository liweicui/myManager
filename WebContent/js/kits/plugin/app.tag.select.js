define(['jsPlugin/app.ui.base', 'link!cssKits/pop-picker.css'], function(UIBase){

    var TPL = {
        body: function() {/*!
             <div class="nav-header">
                 <table>
                    <tr>
                        <th>
                            <i class="prev glyphicon glyphicon-arrow-left"></i>
                        </th>
                        <th class="select-nav" >
                            <#for(var i = 0 ; i< this.data.length;i++){#>
                                <span data-nav="<#=i#>"><#=this.data[i].text#></span>
                            <#}#>
                        </th>
                        <th>
                            <i class="next glyphicon glyphicon-arrow-right"></i>
                        </th>
                    </tr>
                </table>
            </div>
            <#for(var i = 0 ; i< this.data.length;i++){#>
                <#var items = this.data[i].items;#>
                 <ul data-nav="<#=i#>" class="nav nav-pills">
                     <#for(var j = 0 ; j < items.length; j++){#>
                        <li data-id="<#=items[j].id#>"><a href="#"><#=items[j].text#></a></li>
                     <#}#>
                </ul>
            <#}#>
        */}
    }

    var TagSelect = $.inherits(UIBase, {

        autoShow : false,

        currentNav: undefined,

        currentItem: undefined,

        selected : undefined,

        type: 'tagselect',

        cls: 'tag-select',

        index: 0,

        onInitialize : function(){
            this.bodyRender = $.linesTpl(TPL.body);
            //this.selected  = this.selected || this.data[0].items[0].id;
            this.indexData = this.createDataIndex();
        },

        onRender:function(){
            this.el.append(this.bodyRender({ data: this.data }));

            this.navsEl = this.el.find('.select-nav span');
            this.itemsEl = this.el.find('.nav-pills');

            this.el.find(".prev").on('click',$.proxy(this.prev, this));
            this.el.find(".next").on('click',$.proxy(this.next, this));
            this.el.find(".nav li a").on('click',$.proxy(this.changeSelected,this));

            if(this.selected){
                this.selectDefaultValue();
            }else{
                this.changeNav(this.index);
            }
        },

        createDataIndex: function(){
            var indexData = {};
            for (var i = 0; i < this.data.length; i++) {
                var items = this.data[i].items;
                for (var j = 0; j < items.length; j++) {
                    indexData[items[j].id] = {
                        data: items[j],
                        navIndex: i
                    }
                }
            }
            return indexData;
        },

        prev: function(){
            var index = this.navsEl.index(this.currentNav);
            this.changeNav(index - 1 );
        },

        next: function(){
            var index = this.navsEl.index(this.currentNav);
            this.changeNav(index + 1);
        },

        changeNav : function(index){

            if(this.currentNav){
                if(index < 0 || index >= this.navsEl.size() || index == this.navsEl.index(this.currentNav) ) return;
            }

            if(this.currentNav)this.currentNav.css('display','none');
            if(this.currentItem)this.currentItem.css('display','none');

            this.currentNav = $(this.navsEl[index]);
            this.currentItem = $(this.itemsEl[index]);

            this.currentNav.css('display', 'block');
            this.currentItem.css('display', 'block');

            this.el.find(".prev").css('opacity', index == 0 ? '0.4' : '1');
            this.el.find(".next").css('opacity', index == this.navsEl.size() -1 ? '0.4': '1');
        },

        changeSelected: function(e){
            var newId = $(e.target).closest("li").data('id');
            this.selectValue(newId);
        },

        selectDefaultValue: function(){
            var itemEl = this.el.find('[data-id="'+ this.selected +'"]').closest('ul'),
                changeIndex = this.itemsEl.index(itemEl);
            this.selectValue(this.selected);
            this.changeNav(changeIndex);
        },

        onSelect: function(nav, selected){},

        selectValue: function(id){
            var oldEl = this.el.find('[data-id="'+ this.selected +'"]'),
                newEl = this.el.find('[data-id="'+ id +'"]');
            oldEl.removeClass('active');
            newEl.addClass('active');
            this.selected = id;
            this.selectItem = this.indexData[this.selected];

            //updateNav
            this.changeNav(this.selectItem.navIndex);

            //update text value
            this.onSelect(this.getNav(this.selectItem), this.selectItem.data);
        },

        getNav: function(selectItem){
            return this.data[ (selectItem || this.selectItem).navIndex];
        },

        getSelectedData: function(){
            return this.selectItem.data;
        }

    });

    return TagSelect;
});