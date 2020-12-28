<template>
  <div>
    <v-container>
      <v-toolbar floating dense min-width="300">
        <v-toolbar-title>Photos</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon @click="dialog = true">
          <v-icon>mdi-card-plus</v-icon>
        </v-btn>
      </v-toolbar>

      <v-row>
        <v-col
          v-if="!loaded"
          cols="3"
        >
          <v-skeleton-loader
            class="mx-auto"
            type="image"
            elevation="2"
          ></v-skeleton-loader>
        </v-col>
        <v-col
          v-for="photo in photos"
          :key="photo.id"
          class="d-flex child-flex"
          xs="12"
          sm="6"
          lg="3"
        >
          <v-hover v-slot:default="{ hover }">
            <div class="image">
              <v-img
                :src="photo.path"
                :lazy-src="photo.path"
                class="grey lighten-2"
              >
                <template v-slot:placeholder>
                  <v-row
                    class="fill-height ma-0"
                    align="center"
                    justify="center"
                  >
                    <v-progress-circular
                      indeterminate
                      color="grey lighten-5"
                    ></v-progress-circular>
                  </v-row>
                </template>
              </v-img>
              <v-fade-transition>
                <v-overlay
                  v-if="hover"
                  absolute
                  color="#000"
                >
                  <div >
                    <v-btn
                      icon
                      color="green"
                      @click="makeLayout(photo.id)"
                      :loading="loading"
                    >
                      <v-icon>mdi-image-album</v-icon>
                    </v-btn>
                    <v-btn
                      icon
                      color="red"
                      @click="remove(photo.id)"
                      :loading="loading"
                    >
                      <v-icon>mdi-trash-can-outline</v-icon>
                    </v-btn>
                  </div>
                </v-overlay>
              </v-fade-transition>
            </div>
          </v-hover>
        </v-col>
      </v-row>
    </v-container>
    <v-row justify="center">
      <v-dialog
        v-model="dialog"
        persistent
        max-width="300px"
      >
        <v-card>
          <v-card-title>
            <span class="headline">Add photo</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-file-input
                accept="image/*"
                multiple
                label="Photo input"
                id="files"
                ref="files"
                @change="handleFileUpload"
              ></v-file-input>
              <v-progress-linear
                v-if="uploadProgress > 0"
                v-model="uploadProgress"
                color="amber"
                height="25"
              ></v-progress-linear>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="blue darken-1"
              text
              @click="dialog = false"
            >
              Close
            </v-btn>
            <v-btn
              color="blue darken-1"
              text
              @click="add"
            >
              Add
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>

<script>
    export default {
      data: () => ({
        loading: false,
        loaded: false,
        dialog: false,
        photos: [],
        newPhotos: null,
        uploadProgress: 0
      }),
      mounted() {
        this.load();
      },
      methods: {
        load() {
          this.$axios.get('/api/photos', {
            params: {
              album_id: this.$route.params.id
            }
          })
          .then((res) => {
            this.photos = res.data;
          })
          .finally(() => {
            this.loaded = true
          })
        },
        add() {
          let formData = new FormData();
          for(let i = 0; i < this.newPhotos.length; i++ ) {
            let file = this.newPhotos[i];
            formData.append('photos[' + i + ']', file);
          }
          formData.append('album_id', this.$route.params.id);
          this.$axios.post('/api/photos',
            formData,
            {
              headers: {
                'Content-Type': 'multipart/form-data'
              },
              onUploadProgress: function( progressEvent ) {
                this.uploadProgress = parseInt( Math.round( ( progressEvent.loaded / progressEvent.total ) * 100 ));
              }.bind(this)
            }
          )
            .then(() => {
              this.newPhotos = null;
              this.$refs.files.value = null;
              this.load();
              this.dialog = false;
            });
        },
        remove(id) {
          this.loading = true;
          this.$axios.delete(`/api/photos/${id}`)
          .then((res) => {
            this.load();
            this.loading = false;
          })
        },
        handleFileUpload(files){
          this.newPhotos = files;
          // this.newPhoto.photo = file;
        },
        makeLayout(id) {
          this.loading = true;
          this.$axios.post(`/api/photos/make_layout/${id}`)
            .then((res) => {
              this.load();
              this.loading = false;
            })
        }
      }
    }
</script>

<style lang="sass" scoped>
  .image
    position: relative
  .icons
    position: absolute
    top: 10px
    right: 10px
</style>
