<template>
  <div class="row">
    <div class="col-md-12">
      <div class="card">
        <div class="row">
          <div class="col-md-6">
            <div class="card-header">
              <h4 class="card-title">Colors</h4>
            </div>
            <div class="card-body">
              <button class="btn btn-default btn-wd">Default</button>
              <button class="btn btn-primary btn-wd">Primary</button>
              <button class="btn btn-info btn-wd">Info</button>
              <button class="btn btn-success btn-wd">Success</button>
              <button class="btn btn-warning btn-wd">Warning</button>
              <button class="btn btn-danger btn-wd">Danger</button>
            </div>
          </div>
          <div class="col-md-6">
            <div class="card-header">
              <h4 class="card-title">Styles</h4>
            </div>
            <div class="card-body">
              <button class="btn btn-wd">Default</button>
              <button class="btn btn-outline btn-wd">Outline</button>
              <button class="btn btn-round btn-wd">Fill + Round</button>
              <button class="btn btn-outline btn-round btn-wd">Outline + Round</button>
              <button class="btn btn-simple btn-link btn-wd">Simple</button>
            </div>

          </div>
        </div>

        <div class="row">
          <div class="col-md-6">
            <div class="card-header">
              <h4 class="card-title">Buttons with Label</h4>
            </div>
            <div class="card-body">
              <button type="button" class="btn btn-wd btn-success btn-outline">
                                <span class="btn-label">
                                    <i class="fa fa-check"></i>
                                </span>
                Success
              </button>

              <button type="button" class="btn btn-wd btn-danger btn-outline">
                                <span class="btn-label">
                                    <i class="fa fa-times"></i>
                                </span>
                Danger
              </button>

              <button type="button" class="btn btn-wd btn-info btn-outline">
                                <span class="btn-label">
                                    <i class="fa fa-exclamation"></i>
                                </span>
                Info
              </button>

              <button type="button" class="btn btn-wd btn-warning btn-outline">
                                <span class="btn-label">
                                    <i class="fa fa-warning"></i>
                                </span>
                Warning
              </button>

              <button type="button" class="btn btn-wd btn-default btn-outline">
                                <span class="btn-label">
                                    <i class="fa fa-arrow-left"></i>
                                </span>
                Left
              </button>

              <button type="button" class="btn btn-wd btn-default btn-outline">
                Right
                <span class="btn-label btn-label-right">
                                    <i class="fa fa-arrow-right"></i>
                                </span>
              </button>
            </div>
          </div>

          <div class="col-md-6">
            <div class="card-header">
              <h4 class="card-title">Sizes</h4>
            </div>
            <div class="card-body">
              <button class="btn btn-lg">Large</button>
              <button class="btn">Default</button>
              <button class="btn btn-sm">Small</button>
              <!-- <button class="btn btn-xs ">X-Small</button> -->


              <br>
              <button class="btn btn-round btn-lg">Large</button>
              <button class="btn btn-round">Default</button>
              <button class="btn btn-round btn-sm">Small</button>
              <!-- <button class="btn btn-round btn-xs ">X-Small</button> -->
            </div>
          </div>
        </div>


        <div class="row">
          <div class="col-md-6">
            <div class="card-header">
              <h4 class="card-title">Button Group</h4>
            </div>
            <div class="card-body">
              <div class="btn-group">
                <button type="button" class="btn btn-default btn-outline">Left</button>
                <button type="button" class="btn btn-default btn-outline">Middle</button>
                <button type="button" class="btn btn-default btn-outline">Right</button>
              </div>

              <br><br>
              <div class="btn-group">
                <button type="button" class="btn btn-default btn-outline">1</button>
                <button type="button" class="btn btn-default btn-outline">2</button>
                <button type="button" class="btn btn-default btn-outline">3</button>
                <button type="button" class="btn btn-default btn-outline">4</button>
              </div>
              <div class="btn-group">
                <button type="button" class="btn btn-default btn-outline">5</button>
                <button type="button" class="btn btn-default btn-outline">6</button>
                <button type="button" class="btn btn-default btn-outline">7</button>
              </div>
              <div class="btn-group">
                <button type="button" class="btn btn-default btn-outline">8</button>
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="card-header">
              <h4 class="card-title">Pagination</h4>
            </div>

            <div class="card-body">
              <l-pagination :page-count="10" v-model="defaultPagination"></l-pagination>
              <l-pagination class="pagination-no-border" :page-count="10" v-model="infoPagination"></l-pagination>
            </div>
          </div>
        </div>


        <div class="card-header">
          <h4 class="card-title">Social buttons</h4>
        </div>

        <div class="card-body">
          <div class="row">
            <div class="col-md-4 social-buttons-demo">
              <h4 class="title">
                <small> Filled </small>
              </h4>
              <button class="btn btn-social  btn-twitter">
                <i class="fa fa-twitter"></i> Connect with Twitter
              </button>
              <br>
              <button class="btn btn-social  btn-facebook">
                <i class="fa fa-facebook-square"></i> Share · 2.2k
              </button>
              <br>
              <button class="btn btn-social  btn-google">
                <i class="fa fa-google-plus-square"></i> Share on Google+
              </button>
              <br>
              <button class="btn btn-social  btn-linkedin">
                <i class="fa fa-linkedin-square"></i> Connect with Linkedin
              </button>
              <br>
              <button class="btn btn-social  btn-pinterest">
                <i class="fa fa-pinterest"></i> Pint it · 212
              </button>
              <br>
              <button class="btn btn-social  btn-youtube">
                <i class="fa fa-youtube-play"></i> View on Youtube
              </button>
              <br>
              <button class="btn btn-social  btn-tumblr">
                <i class="fa fa-tumblr-square"></i> Repost
              </button>
              <br>
              <button class="btn btn-social  btn-github">
                <i class="fa fa-github"></i> Connect with Github
              </button>
              <br>
              <button class="btn btn-social  btn-behance">
                <i class="fa fa-behance-square"></i> Follow us
              </button>
              <br>
              <button class="btn btn-social  btn-dribbble">
                <i class="fa fa-dribbble"></i> Find us on Dribbble
              </button>
              <br>
              <button class="btn btn-social  btn-reddit">
                <i class="fa fa-reddit"></i> Repost · 232
              </button>
              <br>
              <button class="btn btn-social  btn-stumbleupon">
                <i class="fa fa-stumbleupon"></i> View on StumbleUpon
              </button>
              <br>
            </div>

            <div class="col-md-2 social-buttons-demo">
              <h4 class="title">
                <small>Light</small>
              </h4>
              <button class="btn btn-social btn-round btn-twitter btn-outline">
                <i class="fa fa-twitter"></i>
              </button>
              <br>
              <button class="btn btn-social btn-round btn-facebook btn-outline">
                <i class="fa fa-facebook"> </i>
              </button>
              <br>
              <button class="btn btn-social btn-round btn-google btn-outline">
                <i class="fa fa-google-plus"> </i>
              </button>
              <br>
              <button class="btn btn-social btn-round btn-linkedin btn-outline">
                <i class="fa fa-linkedin"></i>
              </button>
              <br>
              <button class="btn btn-social btn-round btn-pinterest btn-outline">
                <i class="fa fa-pinterest"></i>
              </button>
              <br>
              <button class="btn btn-social btn-round btn-youtube btn-outline">
                <i class="fa fa-youtube"> </i>
              </button>
              <br>
              <button class="btn btn-social btn-round btn-tumblr btn-outline">
                <i class="fa fa-tumblr"> </i>
              </button>
              <br>
              <button class="btn btn-social btn-round btn-github btn-outline">
                <i class="fa fa-github"></i>
              </button>
              <br>
              <button class="btn btn-social btn-round btn-behance btn-outline">
                <i class="fa fa-behance"></i>
              </button>
              <br>
              <button class="btn btn-social btn-round btn-dribbble btn-outline">
                <i class="fa fa-dribbble"></i>
              </button>
              <br>
              <button class="btn btn-social btn-round btn-reddit btn-outline">
                <i class="fa fa-reddit"></i>
              </button>
              <br>
              <button class="btn btn-social btn-round btn-stumbleupon btn-outline">
                <i class="fa fa-stumbleupon"></i>
              </button>
              <br>
            </div>
            <div class="col-md-2 social-buttons-demo">
              <h4 class="title">
                <small>Simple</small>
              </h4>
              <button class="btn btn-social btn-link btn-twitter">
                <i class="fa fa-twitter"></i>
              </button>
              <br>
              <button class="btn btn-social btn-link btn-facebook">
                <i class="fa fa-facebook-square"> </i>
              </button>
              <br>
              <button class="btn btn-social btn-link btn-google">
                <i class="fa fa-google-plus-square"> </i>
              </button>
              <br>
              <button class="btn btn-social btn-link btn-linkedin">
                <i class="fa fa-linkedin-square"></i>
              </button>
              <br>
              <button class="btn btn-social btn-link btn-pinterest">
                <i class="fa fa-pinterest"></i>
              </button>
              <br>
              <button class="btn btn-social btn-link btn-youtube">
                <i class="fa fa-youtube"> </i>
              </button>
              <br>
              <button class="btn btn-social btn-link btn-tumblr">
                <i class="fa fa-tumblr-square"> </i>
              </button>
              <br>
              <button class="btn btn-social btn-link btn-github">
                <i class="fa fa-github"></i>
              </button>
              <br>
              <button class="btn btn-social btn-link btn-behance">
                <i class="fa fa-behance"></i>
              </button>
              <br>
              <button class="btn btn-social btn-link btn-dribbble">
                <i class="fa fa-dribbble"></i>
              </button>
              <br>
              <button class="btn btn-social btn-link btn-reddit">
                <i class="fa fa-reddit"></i>
              </button>
              <br>
              <button class="btn btn-social btn-link btn-stumbleupon">
                <i class="fa fa-stumbleupon"></i>
              </button>
              <br>
            </div>
            <div class="col-md-4 social-buttons-demo">
              <h4 class="title">
                <small>With Text</small>
              </h4>
              <button class="btn btn-social btn-link btn-twitter">
                <i class="fa fa-twitter"></i> Connect with Twitter
              </button>
              <br>
              <button class="btn btn-social btn-link btn-facebook">
                <i class="fa fa-facebook-square"></i> Share · 2.2k
              </button>
              <br>
              <button class="btn btn-social btn-link btn-google">
                <i class="fa fa-google-plus-square"></i> Share on Google+
              </button>
              <br>
              <button class="btn btn-social btn-link btn-linkedin">
                <i class="fa fa-linkedin-square"></i> Connect with Linkedin
              </button>
              <br>
              <button class="btn btn-social btn-link btn-pinterest">
                <i class="fa fa-pinterest"></i> Pint it · 212
              </button>
              <br>
              <button class="btn btn-social btn-link btn-youtube">
                <i class="fa fa-youtube-play"></i> View on Youtube
              </button>
              <br>
              <button class="btn btn-social btn-link btn-tumblr">
                <i class="fa fa-tumblr-square"></i> Repost
              </button>
              <br>
              <button class="btn btn-social btn-link btn-github">
                <i class="fa fa-github"></i> Connect with Github
              </button>
              <br>
              <button class="btn btn-social btn-link btn-behance">
                <i class="fa fa-behance-square"></i> Follow us
              </button>
              <br>
              <button class="btn btn-social btn-link btn-dribbble">
                <i class="fa fa-dribbble"></i> Find us on Dribbble
              </button>
              <br>
              <button class="btn btn-social btn-link btn-reddit">
                <i class="fa fa-reddit"></i> Repost · 232
              </button>
              <br>
              <button class="btn btn-social btn-link btn-stumbleupon">
                <i class="fa fa-stumbleupon"></i> View on StumbleUpon
              </button>
              <br>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>
<script>
  import LPagination from 'src/components/Pagination.vue'

  export default {
    components: {
      LPagination
    },
    data () {
      return {
        defaultPagination: 3,
        infoPagination: 5
      }
    }
  }
</script>
<style>

</style>
