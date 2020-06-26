var galleryItems = [
    {
        "img": "images/girl.png",
        "top": true,
        "name": "Carolina",
        "info": "23 anni / Milano",
        "category": "DONNA",
        "num_photos": 24,
        "tyneye": true,
        "location": true,
        "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."


    },
    {
        "img": "images/girl.png",
        "top": false,
        "name": "Carolina",
        "info": "23 anni / Milano",
        "category": "DONNA",
        "num_photos": 24,
        "tyneye": false,
        "location": true,
        "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."


    },
    {
        "img": "images/elephant.jpg",
        "top": true,
        "name": "Carolina",
        "info": "23 anni / Milano",
        "category": "DONNA",
        "num_photos": 24,
        "tyneye": true,
        "location": false,
        "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."



    },
    {
        "img": "images/girl.png",
        "top": false,
        "name": "Carolina",
        "info": "23 anni / Milano",
        "category": "DONNA",
        "num_photos": 25,
        "tyneye": false,
        "location": false,
        "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."



    },
    {
        "img": "images/girl2.png",
        "top": false,
        "name": "Carolina",
        "info": "23 anni / Milano",
        "category": "DONNA",
        "num_photos": 25,
        "tyneye": false,
        "location": false,
        "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."



    },

    {
        "img": "images/girl.png",
        "top": false,
        "name": "Carolina",
        "info": "23 anni / Milano",
        "category": "DONNA",
        "num_photos": 25,
        "tyneye": false,
        "location": false,
        "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."



    },
];
Vue.component('media-item', {
    props: ['item'],
    template: `
    <a href="#">
    <div class="do-gallery-item" :style="{ background: 'url(' + item.img + ')', 'background-size': 'cover',
    'background-repeat': 'no-repeat'}"  >
    <span class="do-location" :class="{ inactive: !item.location  }"></span>
    <div class="do-top" v-show="item.top"></div>
    <div class="do-item-info">
        <div class="do-item-info-top">
            <div class="do-left-wrap">
                <h1>{{item.name}} </h1>
                <p>{{item.info}}</p>
                <p>{{item.category}}</p>
            </div>
            <div class="do-right-wrap">
            <span class="badge badge-light">3km</span>
              
                <span class="do-photos-num">{{item.num_photos}}</span>
            </div>
        </div>
        <div class="do-item-info-bottom" v-show="item.tyneye">
            <span>Verificato TinEye</span>
        </div>

    </div>
    <div class="do-overlay">
        <div class="do-text">
            <h1>Profilo </h1>
            <p> {{item.text}}</p>
        </div>

    </div>
</div>
</a>
    `
});

Vue.component('media-gallery', {
    props: ['media', 'index'],
    template: `
    <div class="container">
        <div id="do-gallery-wrap" class="do-gallery-items">
            <media-item v-for="item in paginatedMedia" :key="item.id" :item="item"></media-item>
        </div>
        <div  class="do-load-wrap" v-if="paginatedMedia.length !== media.length" style="cursor: pointer;">
                <button  id="loadMore" @click="loadMore(index)" class="btn btn-pink">Carica altri</button>
         </div>
    </div>`,
    computed: {
        paginatedMedia() {
            return this.media.slice(0, this.index);
        }
    },
    methods: {
        loadMore: function (index) {
            this.$emit('update:index', index + 4);
        }
    }

});

var gallery = new Vue({
    el: "#gallery",
    data() {
        return {
            index: 4,
            media: []
        };
    },
    beforeMount() {
        if (window.loadedGalleryItems) {
            this.index = window.loadedGalleryItems;
        }
        this.updateGallery();
    },
    watch: {
        index: function (newVal, oldVal) {
            window.loadedGalleryItems = newVal;
        }
    },
    methods: {
        updateGallery() {
       
            // $.ajax({
            //     url: '/url'
            // }).done((data) => {
            //     this.$set(this, 'media', data);
            // }).fail(err => console.error);
            this.$set(this, 'media', galleryItems);
        }
    }
});


