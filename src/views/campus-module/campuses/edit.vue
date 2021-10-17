<template>
  <b-sidebar
    id="edit-customer-sidebar-active"
    :visible="isEditCustomerSidebarActive"
    bg-variant="white"
    sidebar-class="sidebar-lg"
    shadow
    backdrop
    no-header
    right
    @hidden="resetForm"
    @change="(val) => $emit('update:is-edit-customer-sidebar-active', val)"
  >
    <template #default="{ hide }">
      <!-- Header -->

      <div
        class="
          d-flex
          justify-content-between
          align-items-center
          content-sidebar-header
          px-2
          py-1
        "
      >
        <h5 class="mb-0">Edit Customer Info</h5>

        <feather-icon
          class="ml-1 cursor-pointer"
          icon="XIcon"
          size="16"
          @click="hide"
        />
      </div>

      <!-- BODY -->
      <validation-observer #default="{ handleSubmit }" ref="refFormObserver">
        <!-- Form -->
        <b-form
          class="p-2"
          @submit.prevent="handleSubmit(onSubmit)"
          @reset.prevent="resetForm"
        >
          <!-- Name-->
          <validation-provider
            #default="validationContext"
            name="Name"
            rules="required"
          >
            <b-form-group label="Name *" label-for="name">
              <b-form-input
                id="name"
                v-model="requestData.name"
                autofocus
                :state="getValidationState(validationContext)"
                trim
                placeholder="name"
              />

              <b-form-invalid-feedback>
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>
          <!-- Tin No-->
          <validation-provider
            #default="validationContext"
            name="Tin No"
            rules="required"
          >
            <b-form-group label="Tin No *" label-for="name">
              <b-form-input
                id="name"
                v-model="requestData.tin_no"
                autofocus
                :state="getValidationState(validationContext)"
                trim
                placeholder="name"
              />

              <b-form-invalid-feedback>
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>
          <!-- Form Actions -->
          <div class="d-flex mt-2">
            <b-button
              v-ripple.400="'rgba(255, 255, 255, 0.15)'"
              variant="primary"
              class="mr-2"
              type="submit"
            >
              Save
            </b-button>
            <b-button
              v-ripple.400="'rgba(186, 191, 199, 0.15)'"
              type="button"
              variant="outline-secondary"
              @click="hide"
            >
              Cancel
            </b-button>
          </div>
        </b-form>
      </validation-observer>
      <b-overlay :show="isLoading" no-wrap rounded="sm" />
    </template>
  </b-sidebar>
</template>

<script>
import {
  BSidebar,
  BForm,
  BOverlay,
  BFormGroup,
  BFormInput,
  BFormInvalidFeedback,
  BButton,
  BFormCheckbox,
} from "bootstrap-vue";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import { ref, computed } from "@vue/composition-api";
import { required, alphaNum } from "@validations";
import formValidation from "@core/comp-functions/forms/form-validation";
import Ripple from "vue-ripple-directive";
import vSelect from "vue-select";
import axios from "@axios";
import countries from "@/@fake-db/data/other/countries";

export default {
  name: "EditCustomer",
  components: {
    BSidebar,
    BForm,
    BOverlay,
    BFormGroup,
    BFormInput,
    BFormInvalidFeedback,
    BButton,
    vSelect,
    BFormCheckbox,
    // Form Validation
    ValidationProvider,
    ValidationObserver,
  },
  directives: {
    Ripple,
  },
  model: {
    prop: "isEditCustomerSidebarActive",
    event: "update:is-edit-customer-sidebar-active",
  },
  props: {
    isEditCustomerSidebarActive: {
      type: Boolean,
      required: true,
    },
    editabelData: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      required,
      alphaNum,
      countries,
    };
  },
  setup(props, { emit }) {
    const isLoading = ref(false);
    const requestData = computed(() => props.editabelData);
    const resetrequestData = () => {
      requestData.value = computed(() => {});
    };

    const onSubmit = () => {
      isLoading.value = true;
      const customer = {
        id: requestData.value.id,
        name: requestData.value.name,
        tin_no: requestData.value.tin_no,
      };
      axios
        .put(`/api/auth/customers/${customer.id}`, customer)
        .then((res) => {
          isLoading.value = false;
          emit("update:is-edit-customer-sidebar-active", false);
          emit("status-message", res.data);
          emit("refetch-customer-data");
        })
        .catch(() => {
          isLoading.value = false;
        });
    };

    const { refFormObserver, getValidationState, resetForm } =
      formValidation(resetrequestData);

    return {
      requestData,
      onSubmit,
      isLoading,
      refFormObserver,
      getValidationState,
      resetForm,
    };
  },
};
</script>

<style lang="scss">
@import "@core/scss/vue/libs/vue-select.scss";
</style>
