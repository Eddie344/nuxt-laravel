<template>
  <div>
    <v-container>
      <v-toolbar floating dense min-width="300">
        <v-toolbar-title>Питомцы</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon @click="dialogNew = true">
          <v-icon>mdi-card-plus</v-icon>
        </v-btn>
      </v-toolbar>
      <v-row dense>
        <v-col
          v-if="!loaded"
          xs="12"
          sm="6"
          lg="3"
        >
          <v-skeleton-loader
            class="mx-auto"
            type="card"
            elevation="2"
          ></v-skeleton-loader>
        </v-col>
        <v-col
          v-else
          v-for="pet in pets"
          :key="pet.label"
          xs="12"
          sm="6"
          lg="3"
        >
          <v-card
            hover
            :to="'/pets/'+pet.id"
            @contextmenu="show($event, pet.id)"
          >
            <v-img
              :src="pet.photo ? pet.photo.path : null"
              class="white--text align-end"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              height="200px"
            >
              <v-card-title v-text="pet.name"></v-card-title>
            </v-img>
            <v-card-text>
              <p class="mb-1">Пол: {{ pet.sex ? 'девочка' : 'мальчик' }}</p>
              <p class="mb-1">Возраст: {{ pet.age }}</p>
              <p class="mb-1">Статус: {{ pet.status ? pet.status.title : '' }}</p>
              <p class="mb-1">Локация: {{ pet.location }}</p>
            </v-card-text>
            <v-card-actions>

            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>

      <v-menu
        v-model="showMenu"
        :position-x="x"
        :position-y="y"
        absolute
        offset-y
      >
        <v-list>
          <v-list-item-group>
            <v-list-item>
              <v-list-item-title @click="showEditDialog(selectedId)">Edit</v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-title @click="remove(selectedId)">Remove</v-list-item-title>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-menu>
    </v-container>
    <v-row justify="center">
      <v-dialog
        v-model="dialogNew"
        persistent
        max-width="300px"
      >
        <v-card>
          <v-card-title>
            <span class="headline">Добавить питомца</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-text-field
                label="Имя"
                v-model="newPet.name"
                required
              ></v-text-field>

              <v-radio-group
                v-model="newPet.sex"
                row
              >
                <v-radio
                  label="Мальчик"
                  value="0"
                ></v-radio>
                <v-radio
                  label="Девочка"
                  value="1"
                ></v-radio>
              </v-radio-group>

              <v-text-field
                label="Возраст"
                v-model="newPet.age"
                required
              ></v-text-field>

              <v-select
                v-model="newPet.status_id"
                :items="petStatuses"
                item-text="title"
                item-value="id"
                label="Статус"
              ></v-select>

              <v-text-field
                label="Локация"
                v-model="newPet.location"
                required
              ></v-text-field>
              <v-file-input
                accept="image/*"
                label="Выберите фото"
                id="file"
                ref="file"
                @change="handleFileUpload"
              ></v-file-input>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="blue darken-1"
              text
              @click="dialogNew = false"
            >
              Закрыть
            </v-btn>
            <v-btn
              color="blue darken-1"
              text
              @click="add"
            >
              Добавить
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>

    <v-row justify="center">
      <v-dialog
        v-model="dialogEdit"
        persistent
        max-width="300px"
      >
        <v-card>
          <v-card-title>
            <span class="headline">Изменить питомца</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-text-field
                label="Имя"
                v-model="editingPet.name"
                required
              ></v-text-field>

              <v-radio-group
                v-model="editingPet.sex"
                row
              >
                <v-radio
                  label="Мальчик"
                  value="0"
                ></v-radio>
                <v-radio
                  label="Девочка"
                  value="1"
                ></v-radio>
              </v-radio-group>

              <v-text-field
                label="Возраст"
                v-model="editingPet.age"
                required
              ></v-text-field>

              <v-select
                v-model="editingPet.status_id"
                :items="petStatuses"
                item-text="title"
                item-value="id"
                label="Статус"
              ></v-select>

              <v-text-field
                label="Локация"
                v-model="editingPet.location"
                required
              ></v-text-field>
              <v-file-input
                accept="image/*"
                label="Выберите фото"
                id="file"
                ref="file"
                @change="handleFileUpload"
              ></v-file-input>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="blue darken-1"
              text
              @click="dialogEdit = false"
            >
              Закрыть
            </v-btn>
            <v-btn
              color="blue darken-1"
              text
              @click="edit"
            >
              Сохранить
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>

<script>
    const pet = {
      id: null,
      name: '',
      sex: null,
      age: '',
      status_id: null,
      location: ''
    };
    export default {
      data: () => ({
        loaded: false,
        dialogNew: false,
        dialogEdit: false,
        editingPet: {},
        petStatuses: [],
        pets: [],
        newPet: {},
        photo: null,
        showMenu: false,
        selectedId: null,
        x: 0,
        y: 0,
      }),
      mounted() {
        this.resetNewPet();
        this.load();
        this.loadPetStatuses();
      },
      methods: {
        loadPetStatuses() {
          this.$axios.get('/api/pet_statuses')
            .then((res) => {
              this.petStatuses = res.data;
            })
        },
        load() {
          this.$axios.get('/api/pets')
          .then((res) => {
            this.loaded = true;
            this.pets = res.data;
          })
        },
        add() {
          const data = new FormData();
          data.append('photo', this.photo);
          const json = JSON.stringify(this.newPet);
          data.append('data', json);
          this.$axios.post('/api/pets', data)
            .then((res) => {
              console.log(res.data);
              this.load();
            });
          this.resetNewPet();
          this.dialogNew = false;
        },
        edit() {
          const data = new FormData();
          data.append('photo', this.photo);
          const json = JSON.stringify(this.editingPet);
          data.append('data', json);
          data.append('_method', 'PUT');
          this.$axios.post(`/api/pets/${this.editingPet.id}`, data)
            .then((res) => {
              this.load();
            });
          this.resetNewPet();
          this.dialogEdit = false;
        },
        remove(id) {
          this.$axios.delete(`/api/pets/${id}`)
          .then((res) => {
            this.load()
          })
        },
        resetNewPet() {
          this.newPet = this.editingPet = JSON.parse(JSON.stringify(pet));
        },
        show (e, id) {
          e.preventDefault();
          this.selectedId = id;
          this.showMenu = false;
          this.x = e.clientX;
          this.y = e.clientY;
          this.$nextTick(() => {
            this.showMenu = true
          })
        },
        showEditDialog(id) {
          const pet = this.pets.find(i => i.id === id);
          for (let prop in this.editingPet) {
            this.editingPet[prop] = pet[prop];
          }
          this.dialogEdit = true;
        },
        // open(id) {
        //   this.$router.push('/pets/'+id);
        // },
        handleFileUpload(file){
          this.photo = file;
        },
      }
    }
</script>

<style scoped>

</style>
