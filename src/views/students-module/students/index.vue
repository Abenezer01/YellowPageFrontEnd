/* eslint-disable quotes */
<template>
  <div>
    <b-card title="Members">
      <!-- search input -->
      <div class="custom-search d-flex justify-content-end">
        <b-form-group>
          <div class="d-flex d-flex align-items-center justify-content-end">
            <label class="mr-1">Search</label>
            <b-form-input
              v-model="searchTerm"
              placeholder="Search"
              type="text"
              class="d-inline-block mr-1"
            />

            <b-button variant="primary" :to="{ name: 'add-student' }">
              <span class="text-nowrap">Add Student</span>
            </b-button>
          </div>
        </b-form-group>
      </div>

      <!-- table -->
      <vue-good-table
        :columns="columns"
        :rows="rows"
        :rtl="direction"
        :search-options="{
          enabled: true,
          externalQuery: searchTerm,
        }"
        :pagination-options="{
          enabled: true,
          perPage: pageLength,
        }"
      >
        <template slot="table-row" slot-scope="props">
          <span v-if="props.column.field === 'fullName'" class="text-nowrap">
            <b-avatar :src="props.row.avatar" class="mx-1" />
            <span class="text-nowrap">{{ props.row.fullName }}</span>
          </span>
          <!-- Column: Name -->
          <span v-else-if="props.column.field === 'isActive'">
            <b-badge :variant="statusVariant(props.row.isActive)">
              {{ props.row.isActive ? "true" : "false" }}
            </b-badge>
          </span>
          <!-- Column: Status -->
          <span v-else-if="props.column.field === 'isActive'">
            <b-badge :variant="statusVariant(props.row.isActive)">
              {{ props.row.isActive ? "true" : "false" }}
            </b-badge>
          </span>

          <!-- Column: Full Name -->
          <template v-else-if="props.column.field === 'name'">
            <b-avatar :src="props.row.avatar" class="mr-1" />
            <b-link
              :to="{ name: 'view-member', params: { id: props.row.id } }"
              class="stext-nowrap"
              >{{ props.row.name }}</b-link
            >
          </template>
          <span v-else-if="props.column.field === 'action'">
            <span style="overflow-y: scroll">
              <b-dropdown
                variant="link"
                toggle-class="text-decoration-none"
                no-caret
              >
                <template v-slot:button-content>
                  <feather-icon
                    icon="MoreVerticalIcon"
                    size="16"
                    class="text-body align-middle mr-25"
                  />
                </template>
                <b-dropdown-item
                  v-if="$can('update_customers', 'customers')"
                  @click.prevent="handelEdit(props.row)"
                >
                  <feather-icon icon="Edit2Icon" class="mr-50" />
                  <span>Edit</span>
                </b-dropdown-item>

                <!-- <b-dropdown-item :to="{ name: 'crm-advance-payments', params: { id: props.row.id } }">
                  <feather-icon icon="CreditCardIcon" class="mr-50" />
                  <span>Advance Paymnet</span>
                </b-dropdown-item> -->

            

                <b-dropdown-item
                  v-if="$can('delete_customers', 'customers')"
                  @click.prevent="handelDelete(props.row)"
                >
                  <feather-icon icon="TrashIcon" class="mr-50" />
                  <span>Delete</span>
                </b-dropdown-item>
              </b-dropdown>
            </span>
          </span>

          <!-- Column: Common -->
          <span v-else>
            {{ props.formattedRow[props.column.field] }}
          </span>
        </template>

        <!-- pagination -->
        <template slot="pagination-bottom" slot-scope="props">
          <div class="d-flex justify-content-between flex-wrap">
            <div class="d-flex align-items-center mb-0 mt-1">
              <span class="text-nowrap"> Showing 1 to </span>
              <b-form-select
                v-model="pageLength"
                :options="['5', '10', '15', '30']"
                class="mx-1"
                @input="
                  (value) => props.perPageChanged({ currentPerPage: value })
                "
              />
              <span class="text-nowrap"> of {{ props.total }} entries </span>
            </div>
            <div>
              <b-pagination
                :value="1"
                :total-rows="props.total"
                :per-page="pageLength"
                first-number
                last-number
                align="right"
                prev-class="prev-item"
                next-class="next-item"
                class="mt-1 mb-0"
                @input="(value) => props.pageChanged({ currentPage: value })"
              >
                <template #prev-text>
                  <feather-icon icon="ChevronLeftIcon" size="18" />
                </template>
                <template #next-text>
                  <feather-icon icon="ChevronRightIcon" size="18" />
                </template>
              </b-pagination>
            </div>
          </div>
        </template>
      </vue-good-table>
      <!-- loadings -->
      <b-overlay :show="isLoading" no-wrap rounded="sm" />
    </b-card>
  </div>
</template>

<script>
import {
  BCard,
  BAvatar,
  BButton,
  BBadge,
  BCardText,
  BPagination,
  BOverlay,
  BFormGroup,
  BFormInput,
  BFormSelect,
  BDropdown,
  BDropdownItem,
  BLink,
} from "bootstrap-vue";
import { VueGoodTable } from "vue-good-table";
import { ref } from "@vue/composition-api";
import store from "@/store/index";
import EditCustomer from "./edit";

export default {
  components: {
    BCard,
    VueGoodTable,
    BCardText,
    BAvatar,
    BBadge,
    BButton,
    BOverlay,
    BPagination,
    BFormGroup,
    BFormInput,
    BFormSelect,
    BDropdown,
    BDropdownItem,
    BLink,
  },
  setup() {
    const isEditCustomerSidebarActive = ref(false);
    return {
      isEditCustomerSidebarActive,
    };
  },
  data() {
    return {
      pageLength: 10,
      isLoading: false,
      isDeleteModel: false,
      dir: false,
      activeRow: null,
      columns: [
        {
          label: "Name",
          field: "fullName",
        },
        {
          label: "Email",
          field: "email",
        },
        {
          label:"Phone",
          field:"phoneNumber"
        },
        {
          label:"Address",
          field:"address"
        },{
          label:"Gender",
          field:"gender"
        },{
          label:"Fellowship",
          field:"fellowship"
        },{
          label:"Church Engagment",
          field:"churchEngagement"
        },{
          label:"Action",
          field:"action"
        }
      ],
      rows: [],
      searchTerm: "",
      editabelData: {},
    };
  },
  computed: {
    direction() {
      if (store.state.appConfig.isRTL) {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.dir = true;
        return this.dir;
      }
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.dir = false;
      return this.dir;
    },
    statusVariant() {
      const statusColor = {
        /* eslint-disable key-spacing */
        1: "light-success",
        0: "light-danger",
        /* eslint-enable key-spacing */
      };

      return (status) => statusColor[status];
    },
  },
  created() {
    this.isLoading = true;
    this.refetchData();
  },
  methods: {
    refetchData() {
      this.isLoading = true;
      this.$http
        .get("/users")
        .then((res) => {
          this.rows = res.data.data;
          this.isLoading = false;
        })
        .catch(() => {
          this.isLoading = false;
        });
    },

    handelAdd() {},
    handelEdit(row) {
      this.editabelData = row;
      this.isEditCustomerSidebarActive = true;
    },
    handelDelete(row) {
      this.$swal({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        customClass: {
          confirmButton: "btn btn-primary",
          cancelButton: "btn btn-outline-danger ml-1",
        },
        buttonsStyling: false,
      }).then((result) => {
        if (result.value) {
          this.isLoading = true;
          this.$http
            .delete(`/api/auth/customers/${row.id}`)
            .then((res) => {
              this.refetchData();
              this.$swal({
                icon: "success",
                title: "Deleted!",
                text: "Your file has been deleted.",
                customClass: {
                  confirmButton: "btn btn-success",
                },
              });
              this.isLoading = false;
            })
            .catch((err) => {
              this.statusMessage(err.data);
              this.isLoading = false;
            });
        }
      });
      // this.isDeleteModel = true;
      // this.activeRow = row;
    },
  },
};
</script>
<style lang="scss" >
@import "@core/scss/vue/libs/vue-good-table.scss";
</style>
