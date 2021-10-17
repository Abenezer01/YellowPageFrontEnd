<template>
  <div>
    <form-wizard
      color="#7367F0"
      :title="null"
      :subtitle="null"
      shape="square"
      finish-button-text="Submit"
      back-button-text="Previous"
      class="mb-3"
      @on-complete="saveMember"
    >
      <!-- accoint details tab -->
      <tab-content
        title="Basic Information"
        icon="feather icon-file-text"
        :before-change="validationBasicInfo"
      >
        <validation-observer ref="validationBasicInforef" tag="form">
          <b-row>
            <b-col cols="12" class="mb-2">
              <h5 class="mb-0">Basic Information</h5>
              <small class="text-muted"> Enter Your Details. </small>
            </b-col>
            <!-- first_name -->
            <b-col md="6">
              <b-form-group label="First Name *" label-for="first_name">
                <validation-provider
                  #default="{ errors }"
                  name="first name"
                  rules="required"
                >
                  <b-form-input
                    id="first"
                    v-model="member.first_name"
                    autofocus
                    :state="errors.length > 0 ? false : null"
                    placeholder="Dave"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>
            <!--middle name -->
            <b-col md="6">
              <b-form-group label="Middle Name *" label-for="last_name">
                <validation-provider
                  #default="{ errors }"
                  name="middle name"
                  rules="required"
                >
                  <b-form-input
                    id="middle_name"
                    v-model="member.middle_name"
                    autofocus
                    :state="errors.length > 0 ? false : null"
                    placeholder="Dave"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>
            <!--last name -->
            <b-col md="6">
              <b-form-group label="Last Name *" label-for="last_name">
                <validation-provider
                  #default="{ errors }"
                  name="last name"
                  rules="required"
                >
                  <b-form-input
                    id="last_name"
                    v-model="member.last_name"
                    autofocus
                    :state="errors.length > 0 ? false : null"
                    placeholder="Dave"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>
            <!-- Nationality -->
            <b-col md="6">
              <b-form-group label="Nationality *" label-for="nationality">
                <validation-provider
                  #default="{ errors }"
                  name="Nationality"
                  rules="required"
                >
                  <b-form-input
                    id="Nationality"
                    v-model="member.nationality"
                    :state="errors.length > 0 ? false : null"
                    placeholder="Ethiopian"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>
            <b-col md="6">
              <b-form-group label="BirthDate *" label-for="birth_date">
                <validation-provider
                  #default="{ errors }"
                  name="BirthDate"
                  rules="required"
                >
                  <flat-pickr
                    v-model="member.birth_date"
                    :state="errors.length > 0 ? false : null"
                    class="form-control"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>
            <b-col md="6">
              <div class="demo-inline-spacing">
                <b-form-radio
                  v-model="member.gender"
                  name="radio-male"
                  value="male"
                >
                  Male
                </b-form-radio>
                <b-form-radio
                  v-model="member.gender"
                  name="radio-female"
                  value="female"
                >
                  Female
                </b-form-radio>
              </div>
            </b-col>
          </b-row>
        </validation-observer>
        <!-- Vendor Info -->
      </tab-content>

      <!-- Contact persion tab -->
      <tab-content
        title="Contact Persion"
        icon="feather icon-user"
        :before-change="validationFormInfo"
      >
        <validation-observer ref="infoRules" tag="form">
          <b-row>
            <b-col cols="12" class="mb-2">
              <h5 class="mb-0">Contact Info</h5>
              <small class="text-muted">Enter Your Contact Info.</small>
            </b-col>
            <!-- Country -->
            <b-col md="6">
              <b-form-group label="Country *" label-for="country">
                <validation-provider
                  #default="{ errors }"
                  name="country"
                  rules="required"
                >
                  <b-form-input
                    id="country"
                    v-model="address.country"
                    autofocus
                    :state="errors.length > 0 ? false : null"
                    placeholder="Ethiopia"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>
            <!-- City -->
            <b-col md="6">
              <b-form-group label="City *" label-for="city">
                <validation-provider
                  #default="{ errors }"
                  name="city"
                  rules="required"
                >
                  <b-form-input
                    id="city"
                    v-model="address.city"
                    :state="errors.length > 0 ? false : null"
                    placeholder="Addis Ababa"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>
            <!-- SubCity -->
            <b-col md="6">
              <b-form-group label="Sub City *" label-for="sub_city">
                <validation-provider
                  #default="{ errors }"
                  name="Sub City"
                  rules="required"
                >
                  <b-form-input
                    id="sub_city"
                    v-model="address.sub_city"
                    :state="errors.length > 0 ? false : null"
                    placeholder="Bole"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>
            <!-- SubCity -->
            <b-col md="6">
              <b-form-group label="Suburb *" label-for="suburb">
                <validation-provider
                  #default="{ errors }"
                  name="Subrub"
                  rules="required"
                >
                  <b-form-input
                    id="suburb"
                    v-model="address.suburb"
                    :state="errors.length > 0 ? false : null"
                    placeholder=""
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>
            <!-- district -->
            <b-col md="6">
              <b-form-group label="District *" label-for="district">
                <validation-provider
                  #default="{ errors }"
                  name="District"
                  rules="required"
                >
                  <b-form-input
                    id="district"
                    v-model="address.district"
                    :state="errors.length > 0 ? false : null"
                    placeholder="Wereda 6"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>
            <b-col md="6">
              <b-form-group label="House Number *" label-for="house_number">
                <validation-provider #default="{ errors }" name="House Number">
                  <b-form-input
                    id="house_number"
                    v-model="address.house_number"
                    :state="errors.length > 0 ? false : null"
                    placeholder="000000"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>

            <b-col md="6">
              <b-form-group label="Postal Address *" label-for="postal_address">
                <validation-provider
                  #default="{ errors }"
                  name="Postal Address"
                >
                  <b-form-input
                    id="postal_address"
                    v-model="address.postal_address"
                    :state="errors.length > 0 ? false : null"
                    placeholder="000000"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>
            <b-col cols="12" class="mb-2">
              <h5 class="mb-0">Address</h5>
              <small class="text-muted">Enter Your Address.</small>
            </b-col>
            <!-- contacts -->
            <b-col md="12">
              <div>
                <div class="mb-2">
                  <b-form
                    ref="form"
                    :style="{ height: trHeight }"
                    class="repeater-form"
                    @submit.prevent="repeateAgain(contacts)"
                  >
                    <!-- Row Loop -->
                    <b-row
                      v-for="(item, index) in contacts"
                      :id="item.id"
                      :key="item.id"
                      ref="row"
                    >
                      <!-- Item Name -->
                      <b-col md="3">
                        <b-form-group label="Type" label-for="item-name">
                          <v-select
                            id="contact-type"
                            v-model="item.type"
                            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                            :options="['work', 'personal', 'home', 'church']"
                          />
                        </b-form-group>
                      </b-col>

                      <!-- Number -->
                      <b-col md="3">
                        <b-form-group label="Phone" label-for="cost">
                          <b-form-input
                            id="contact-number"
                            v-model="item.phone"
                            type="text"
                            placeholder="0900000000"
                          />
                        </b-form-group>
                      </b-col>
                      <!-- Email -->
                      <b-col md="3">
                        <b-form-group label="Email" label-for="cost">
                          <b-form-input
                            id="contact-email"
                            v-model="item.email"
                            type="text"
                            placeholder="example@CAMPUSBRIDGE.com"
                          />
                        </b-form-group>
                      </b-col>
                      <!-- Email -->
                      <b-col md="1">
                        <b-form-group label="Primary" label-for="cost">
                          <b-form-checkbox
                            v-model="item.is_primary"
                            class="custom-control-primary"
                            name="check-button"
                            @input="changePrimaryContact(item)"
                            switch
                          />
                        </b-form-group>
                      </b-col>

                      <!-- Remove Button -->
                      <b-col lg="2" md="2" class="mb-50">
                        <b-button
                          v-ripple.400="'rgba(234, 84, 85, 0.15)'"
                          variant="outline-danger"
                          class="mt-0 mt-md-2"
                          @click="removeItem(contacts, index)"
                        >
                          <feather-icon icon="XIcon" class="mr-25" />
                        </b-button>
                      </b-col>
                    </b-row>
                    <b-col cols="12">
                      <hr />
                    </b-col>
                  </b-form>
                  <b-button
                    v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                    variant="primary"
                    @click="repeateAgain(contacts)"
                  >
                    <feather-icon icon="PlusIcon" class="mr-25" />
                    <span>Add New</span>
                  </b-button>
                </div>
              </div>
            </b-col>
            <b-col cols="12" class="mb-2">
              <h5 class="mb-0">Social Medias</h5>
              <small class="text-muted">Enter Your Social Medias.</small>
            </b-col>
            <!-- contacts -->
            <b-col md="12">
              <div>
                <div class="mb-2">
                  <b-form
                    ref="form"
                    :style="{ height: trHeight }"
                    class="repeater-form"
                    @submit.prevent="repeateAgain(contacts)"
                  >
                    <!-- Row Loop -->
                    <b-row
                      v-for="(item, index) in memberSocialMedias"
                      :id="item.id"
                      :key="item.id"
                      ref="row"
                    >
                      <!-- Item Name -->
                      <b-col md="4">
                        <b-form-group label="Type" label-for="item-name">
                          <v-select
                            id="contact-type"
                            v-model="item.social_media"
                            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                            :options="socialMedias"
                            @input="addLinkAndUsername(index)"
                            label="name"
                          />
                        </b-form-group>
                      </b-col>

                      <!-- Number -->
                      <b-col md="2">
                        <b-form-group label="UserName" label-for="cost">
                          <b-form-input
                            id="contact-number"
                            v-model="item.user_name"
                            type="text"
                            @input="addLinkAndUsername(index)"
                            placeholder="username"
                          />
                        </b-form-group>
                      </b-col>
                      <!-- Email -->
                      <b-col md="3">
                        <b-form-group label="link" label-for="cost">
                          <b-form-input
                            id="contact-email"
                            v-model="item.link"
                            type="text"
                            placeholder="https://www.facebook.com/username"
                          />
                        </b-form-group>
                      </b-col>
                      <!-- Remove Button -->
                      <b-col lg="2" md="3" class="mb-50">
                        <b-button
                          v-ripple.400="'rgba(234, 84, 85, 0.15)'"
                          variant="outline-danger"
                          class="mt-0 mt-md-2"
                          @click="removeItem(memberSocialMedias, index)"
                        >
                          <feather-icon icon="XIcon" class="mr-25" />
                        </b-button>
                      </b-col>
                      <b-col cols="12">
                        <hr />
                      </b-col>
                    </b-row>
                  </b-form>
                  <b-button
                    v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                    variant="primary"
                    @click="repeateAgain(memberSocialMedias)"
                  >
                    <feather-icon icon="PlusIcon" class="mr-25" />
                    <span>Add New</span>
                  </b-button>
                </div>
              </div>
            </b-col>
          </b-row>
        </validation-observer>
      </tab-content>
      <tab-content
        title="Life Testimoney"
        icon="feather icon-user"
        :before-change="validationFormTestimoney"
      >
        <validation-observer ref="testimonyRules" tag="form">
          <b-row>
            <b-col cols="12" class="mb-2">
              <h5 class="mb-0">Testimoney</h5>
              <small class="text-muted">Life Testimoney.</small>
            </b-col>

            <!-- Country -->
            <b-col md="6">
              <b-form-group label="Religion Background *" label-for="religion">
                <validation-provider
                  #default="{ errors }"
                  name="religion background"
                  rules="required"
                >
                  <v-select
                    v-model="lifeTestimony.religious_background"
                    :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                    :options="relegionList"
                    :state="errors.length > 0 ? false : null"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>
            <b-col md="6">
              <b-form-group
                label="Salivation Date *"
                label-for="salivation_date"
              >
                <validation-provider
                  #default="{ errors }"
                  name="salivation date"
                  rules="required"
                >
                  <flat-pickr
                    v-model="lifeTestimony.salivation_date"
                    :state="errors.length > 0 ? false : null"
                    class="form-control"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>
            <b-col md="12">
              <b-form-group label="Has Baptized" label-for="cost">
                <b-form-checkbox
                  v-model="lifeTestimony.has_baptized"
                  class="custom-control-primary"
                  name="check-button"
                  switch
                />
              </b-form-group>
            </b-col>
            <b-col md="6" v-if="lifeTestimony.has_baptized">
              <b-form-group
                label="Date of baptism *"
                label-for="date_of_baptism"
              >
                <validation-provider
                  #default="{ errors }"
                  name="date of baptism"
                  rules="required"
                >
                  <flat-pickr
                    v-model="lifeTestimony.date_of_baptism"
                    :state="errors.length > 0 ? false : null"
                    class="form-control"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>
            <b-col md="12">
              <b-form-group
                label="Were you a member of another church previously?"
                label-for="cost"
              >
                <b-form-checkbox
                  v-model="lifeTestimony.has_been_member"
                  class="custom-control-primary"
                  name="check-button"
                  switch
                />
              </b-form-group>
            </b-col>
            <b-col md="12" v-if="lifeTestimony.has_been_member">
              <hr />
              <b-row>
                <b-col md="6">
                  <b-form-group label="Church Name *" label-for="church name">
                    <validation-provider
                      #default="{ errors }"
                      name="Postal Address"
                      rules="required"
                    >
                      <b-form-input
                        id="church name"
                        v-model="lifeTestimony.church_name"
                        :state="errors.length > 0 ? false : null"
                        placeholder="Gerji Amanuel"
                      />
                      <small class="text-danger">{{ errors[0] }}</small>
                    </validation-provider>
                  </b-form-group>
                </b-col>

                <b-col md="6">
                  <b-form-group
                    label="Church Phone Number"
                    label-for="church_phone"
                  >
                    <validation-provider
                      #default="{ errors }"
                      name="church phone"
                    >
                      <b-form-input
                        id="church_phone"
                        v-model="lifeTestimony.church_phone"
                        :state="errors.length > 0 ? false : null"
                        placeholder="0900000000"
                      />
                      <small class="text-danger">{{ errors[0] }}</small>
                    </validation-provider>
                  </b-form-group>
                </b-col>
                <b-col md="6">
                  <b-form-group label="Country *" label-for="church_country">
                    <validation-provider
                      #default="{ errors }"
                      name="Country"
                      rules="required"
                    >
                      <b-form-input
                        id="church_country"
                        v-model="lifeTestimony.church_country"
                        :state="errors.length > 0 ? false : null"
                        placeholder="Ethiopia"
                      />
                      <small class="text-danger">{{ errors[0] }}</small>
                    </validation-provider>
                  </b-form-group>
                </b-col>
                <b-col md="6">
                  <b-form-group label="City *" label-for="church_city">
                    <validation-provider
                      #default="{ errors }"
                      name="City"
                      rules="required"
                    >
                      <b-form-input
                        id="church_city"
                        v-model="lifeTestimony.church_city"
                        :state="errors.length > 0 ? false : null"
                        placeholder="Addis Ababa"
                      />
                      <small class="text-danger">{{ errors[0] }}</small>
                    </validation-provider>
                  </b-form-group>
                </b-col>
              </b-row>
            </b-col>
            <b-col md="12">
              <b-form-group
                label="Can you bring a leave letter from your previous church?"
                label-for="cost"
              >
                <b-form-checkbox
                  v-model="lifeTestimony.has_departure_letter"
                  class="custom-control-primary"
                  name="check-button"
                  switch
                />
              </b-form-group>
            </b-col>
            <b-col md="6" v-if="lifeTestimony.has_departure_letter">
              <b-form-group
                label="Departure Letter"
                label-for="departure_letter"
              >
                <b-form-file
                  id="departure_letter"
                  placeholder="Choose a file or drop it here..."
                  drop-placeholder="Drop file here..."
                  no-drop
                />
              </b-form-group>
            </b-col>
            <b-col md="6" v-if="!lifeTestimony.has_departure_letter">
              <b-form-group
                label="Reason for not having letter"
                label-for="departure_letter"
              >
                <b-form-textarea
                  id="textarea-default"
                  v-model="lifeTestimony.reason_nottohave_letter"
                  placeholder="Textarea"
                  rows="3"
                />
              </b-form-group>
            </b-col>
            <b-col md="6">
              <b-form-group
                label="How did you come to this church"
                label-for="departure_letter"
              >
                <b-form-textarea
                  id="textarea-default"
                  v-model="lifeTestimony.reason_to_be_member"
                  placeholder="Textarea"
                  rows="3"
                />
              </b-form-group>
            </b-col>
          </b-row>
        </validation-observer>
      </tab-content>
      <tab-content
        title="Ministry History"
        icon="feather icon-user"
        :before-change="validationMinistryHistory"
      >
        <validation-observer ref="minstryHistoryRules" tag="form">
          <b-row>
            <b-col cols="12" class="mb-2">
              <h5 class="mb-0">Ministry</h5>

              <small class="text-muted"
                >.</small
              >
            </b-col>
            <b-col cols="12">
              <b-form-group label="In what minstry you have served before" label-for="item-name">
                <v-select
                  v-model="member.church_service.church_service_history"
                  :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                  multiple
                  label="title"
                  class="select-size-lg"
                  :options="churchServices"
                />
              </b-form-group>
            </b-col>
              <b-col cols="12">
              <b-form-group label="In what minstry do you want to serve." label-for="item-name">
                <v-select
                  v-model="member.church_service.church_service_wish"
                  :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                  multiple
                  label="title"
                  class="select-size-lg"
                  :options="churchServices"
                />
              </b-form-group>
            </b-col>
          </b-row>
        </validation-observer>
      </tab-content>
      <b-overlay :show="isLoading" no-wrap rounded="sm" />
    </form-wizard>
  </div>
</template>

<script>
import { FormWizard, TabContent } from "vue-form-wizard";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
import "vue-form-wizard/dist/vue-form-wizard.min.css";
import flatPickr from "vue-flatpickr-component";

import axios from "@axios";
import {
  BRow,
  BCol,
  BFormGroup,
  BFormInput,
  BOverlay,
  BFormRadio,
  BButton,
  BForm,
  BFormCheckbox,
  BFormFile,
  BFormTextarea,
} from "bootstrap-vue";
import { required, email } from "@validations";
import countries from "@/@fake-db/data/other/countries";
import vSelect from "vue-select";
import { heightTransition } from "@core/mixins/ui/transition";
import Ripple from "vue-ripple-directive";
import churchServices from "@/@fake-db/data/other/church Services";

export default {
  components: {
    ValidationProvider,
    ValidationObserver,
    FormWizard,
    TabContent,
    BOverlay,
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    flatPickr,
    BFormRadio,
    vSelect,
    BButton,
    BForm,
    BFormCheckbox,
    BFormFile,
    BFormTextarea,
  },
  mixins: [heightTransition],

  data() {
    return {
      countries,
      user: JSON.parse(localStorage.getItem("userData")),
      isLoading: false,
      churchServices,
      member: {
        first_name: "Abenezer",
        middle_name: "Seyoum",
        last_name: "Zewdie",
        nationality: "Ethiopian",
        gender: "male",
        birth_date: new Date(),
        contacts: [],
        social_medias: [],
        life_testimony: {},
        church_service:{
          church_service_history:[],
          church_service_wish:[]
        }
      },
      address: {
        country: "Ethiopia",
        city: "Addis Ababa",
        sub_city: "Bole",
        suburb: "Bole",
        district: "wereda 6",
        house_number: "",
        postal_address: "",
        member_id: "",
      },
      contacts: [
        {
          id: 1,
          type: "",
          number: "",
          email: "",
          is_primary: true,
        },
      ],
      memberSocialMedias: [
        {
          link: "",
          user_name: "",
          social_media: "",
        },
      ],
      lifeTestimony: {
        religious_background: "",
        date_of_salivation: new Date(),
        has_baptized: true,
        date_of_baptism: new Date(),
        has_been_member: true,
        church_name: "",
        church_city: "",
        church_phone: "",
        church_country: "",
        reason_of_departure: "",
        reason_to_be_member: "",
      },
      relegionList: [
        "Orthodox Christianity",
        "Islam",
        "Cultural belief",
        "Catholic",
        "Only Jesus",
        "Jehovah Witness",
      ],
      socialMedias: [],
      church_service:{
        church_service_wish:[],
        church_service_history:[]
      },
      nextTodoId: 2,
      contactsId: [],
      required,
      email,
    };
  },
  mounted() {
    this.initTrHeight();
  },
  created() {
    window.addEventListener("resize", this.initTrHeight);
    axios.get("/auth/master-data/social-medias").then((res) => {
      this.socialMedias = res.data.data;
    });
  },
  destroyed() {
    window.removeEventListener("resize", this.initTrHeight);
  },
  directives: {
    Ripple,
  },
  methods: {
    formSubmitted() {
      this.$toast({
        component: ToastificationContent,
        props: {
          title: "Data Submitted",
          icon: "EditIcon",
          variant: "success",
        },
      });
      // this.$router.push("/members");
    },
    validationBasicInfo() {
      return new Promise((resolve, reject) => {
        this.$refs.validationBasicInforef.validate().then((success) => {
          if (success) {
            resolve(true);
          } else {
            reject();
            console.log("basic info is not working");
          }
        });
      });
    },
    validationMinistryHistory() {
       return new Promise((resolve, reject) => {
        this.$refs.minstryHistoryRules.validate().then((success) => {
          if (success) {
            resolve(true);
          } else {
            reject();
            console.log("validationFormTestimoney is not working");
          }
        });
      });
    },
    validationFormTestimoney() {
      return new Promise((resolve, reject) => {
        this.$refs.testimonyRules.validate().then((success) => {
          if (success) {
            resolve(true);
          } else {
            reject();
            console.log("validationFormTestimoney is not working");
          }
        });
      });
    },
    validationFormInfo() {
      return new Promise((resolve, reject) => {
        this.$refs.infoRules.validate().then((success) => {
          if (success) {
            resolve(true);
          } else {
            reject();
            console.log("validationFormInfo is not working");
          }
        });
      });
    },
    repeateAgain(items) {
      items.push({
        id: (this.nextTodoId += this.nextTodoId),
      });
    },
    removeItem(items, index) {
      items.splice(index, 1);
    },
    addLinkAndUsername(index) {
      this.memberSocialMedias[index].link =
        this.memberSocialMedias[index].social_media.link +
        "/" +
        this.memberSocialMedias[index].user_name;
    },
    changePrimaryContact(item) {
      if (item.is_primary === true) {
        this.contacts.forEach((el) => {
          if (el.id != item.id) {
            el.is_primary = false;
          }
        });
      }
    },
    // API Call
    saveMember() {
      console.log("save member is working");
      this.member.contacts = this.contacts;
      this.member.address = this.address;
      this.member.social_medias = this.memberSocialMedias;
      this.member.life_testimony = this.lifeTestimony;
      this.member.church_service=this.church_service;
      axios.post("/auth/members-module/members", this.member).then((res) => {
        this.statusMessage(res.data);
        this.formSubmitted();
      });
    },
  },
};
</script>
<style lang="scss">
@import "@core/scss/vue/libs/vue-flatpicker.scss";
@import "@core/scss/vue/libs/vue-wizard.scss";
@import "@core/scss/vue/libs/vue-select.scss";
</style>
