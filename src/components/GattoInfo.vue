<template>
  <div class="table-responsive" v-on:click="getFeedings(scope.row.name),getMedications(scope.row.name)">
    <div id="accordion">
      <div class="card">
        <div class="card-header">
          <!--TODO: CAT big one begins here-->
          <b-btn id="fedMed" class="col-12 btn btn-link" v-b-toggle.collapse3>
            <div class="table-bigboy container-fluid">
              <div class="divTable">
                <div class="d-flex justify-content-around primary-cat-row row" role="button">
                  <div class="col-2 photo-thumb" v-if="scope.row.photo !== null">
                    <img :src="scope.row.photo" alt="thumb" class="rounded-circle img-fluid">
                  </div>
                  <div class="col-2 photo-thumb" v-else>
                    <img src="/static/img/cat_n_mouse.png" alt="default pic">
                  </div>
                  <div class="col-2 cat-name">
                    <h4 style="color: #000;text-transform: capitalize;">{{scope.row.name}}</h4>
                    <div class="col-12" style="border: 0px solid darkgrey; display: table" >
                      <div class="d-flex justify-content-center">
                        <div class="table-striped" style="display: table-row">
                          <div style="display: table-cell">{{scope.row.age}}</div>
                          <div style="display: table-cell">-</div>
                          <div style="display: table-cell">{{scope.row.weight}}</div>
                          <div style="display: table-cell">{{scope.row.gender}}</div>
                          <div style="display: table-cell">{{scope.row.cat_type}}</div>
                        </div>
                      </div>
                    </div>
                    <span v-if="scope.row.gender === 'M' " style="color: black;">Male</span>
                    <span v-if="scope.row.gender === 'F' " style="color: black;">Female</span>
                    <p style="color: black;">{{scope.row.birthday | moment("from", "now", true)}}</p>
                  </div>
                  <!--TODO sparkline chart goes here-->
                  <div class="col-5">
                    <!--<div v-if="modals['custom']">-->
                    <GattoChart :message="scope.row.name"></GattoChart>
                    <!--</div>-->
                  </div>
                  <div class="col-3 cat-litter">
                    <div class="btn-group" v-if="scope.row.litter_mates !== null">
                      <button type="button" class="btn btn-warning btn-outline">Litter:</button>
                      <button type="button" class="btn btn-warning btn-outline">{{scope.row.litter_mates ? scope.row.litter_mates : 'none'}}</button>
                    </div>
                    <div class="btn-group" v-else>
                      <button type="button" class="btn btn-default btn-outline">Litter:</button>
                      <button type="button" class="btn btn-default btn-outline">{{scope.row.litter_mates ? scope.row.litter_mates : 'none'}}</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </b-btn>
          <!--TODO: CAT big one ends here-->
        </div>
        <!--TODO: Sub rows START here-->
        <b-collapse id="collapse3" class="collapse" visible>
          <card>
            <vue-tabs value="Description">
              <v-tab title="Feedings">
                <div id="fedsTable" class="table table-striped table-bordered">
                  <div class="fedRow d-flex justify-content-start top-row">
                    <div class="col-1">#</div>
                    <div class="col-1">FT</div>
                    <div class="col-1">WBF</div>
                    <div class="col-1">AFT</div>
                    <div class="col-1">WAF</div>
                    <div class="col-1">ST</div>
                    <div class="col-2">STT</div>
                    <div class="col-2">Actions</div>
                  </div>
                  <div id="feedtable" class="" v-for="fed in catFeedings" :key="fed.id">
                    <form :id="'form'+fed.id" @submit.prevent="updateDeleteFeedsSubmit(fed.id, fed.name, cat.id, cat.name)">
                      <div class="medRow d-flex justify-content-start">
                        <div class="col-1">
                          <fg-input v-if="!fed.showRow" :form="'form'+fed.id" name="id" :value="fed.id">{{fed.id}}</fg-input>
                          <span v-if="fed.showRow">{{fed.id}}</span>
                        </div>
                        <div class="col-1">
                          <fg-input v-if="!fed.showRow" :form="'form'+fed.id" name="food_type" v-validate="'required'" v-model="food_type" type="text" :placeholder="fed.food_type" :error="getError('food_type')"></fg-input>
                          <span v-if="fed.showRow">{{fed.food_type}}</span>
                        </div>
                        <div class="col-1">
                          <fg-input v-if="!fed.showRow" :form="'form'+fed.id" name="weight_before_food" v-validate="'required'" v-model="weight_before_food" type="text" :placeholder="fed.weight_before_food" :error="getError('weight_before_food')"></fg-input>
                          <span v-if="fed.showRow">{{fed.weight_before_food}}</span>
                        </div>
                        <div class="col-1">
                          <fg-input v-if="!fed.showRow && food_type !== 'MN'" :form="'form'+fed.id" name="amount_of_food_taken"  v-validate="'required'" v-model="amount_of_food_taken" type="text" :placeholder="fed.amount_of_food_taken" :error="getError('amount_of_food_taken')"></fg-input>
                          <span v-if="fed.showRow">{{fed.amount_of_food_taken}}</span>
                        </div>
                        <div class="col-1">
                          <fg-input v-if="!fed.showRow" :form="'form'+fed.id" name="weight_after_food" v-model="weight_after_food" v-validate="'required|integer'"  :placeholder="fed.weight_after_food":error="getError('weight_after_food')"/>
                          <span v-if="fed.showRow">{{fed.weight_after_food}}</span>
                        </div>
                        <div class="col-1">
                          <fg-input v-if="!fed.showRow" :form="'form'+fed.id" name="stimulated" v-validate="'required'" v-model="stimulated" :error="getError('stimulated')" type="text" :placeholder="fed.stimulated"></fg-input>
                          <span v-if="fed.showRow">{{fed.stimulated}}</span>
                        </div>
                        <div class="col-2">
                          <fg-input v-if="!fed.showRow" :form="'form'+fed.id" name="stimulation_type" v-validate="'required'" v-model="stimulation_type" :error="getError('stimulation_type')" type="text" :placeholder="fed.stimulation_type"></fg-input>
                          <span v-if="fed.showRow">{{fed.stimulation_type}}</span>
                        </div>
                        <div class="col-3 d-flex align-items-center cancel-submit">
                          <button class="btn btn-sm btn-warning" @click='fed.showRow = !fed.showRow' v-if="!fed.showRow">Cancel</button>
                          <button type="submit" class="btn btn-sm btn-success" v-if="!fed.showRow">Submit</button>

                          <a v-tooltip.top-center="'Edit'" class="btn-warning btn-simple btn-link"
                             @click='fed.showRow = !fed.showRow' v-if="fed.showRow"><i
                            class="fa fa-edit"></i></a>
                          <a v-tooltip.top-center="'Delete'" class="btn-danger btn-simple btn-link" v-if="fed.showRow"
                             @click="handleDelete(fed.id, fed.name, 'feedingRow')">
                            <i class="fa fa-times"></i>
                          </a>
                          <!--<button class="btn btn-sm btn-info" @click='fed.showRow = !fed.showRow' v-if="fed.showRow">Edit</button>-->
                          <!--<button type="submit" class="btn btn-sm btn-danger" v-if="fed.showRow" @click="handleDelete(fed.id, fed.name, 'feedingRow')">Delete</button>-->
                        </div>
                      </div>
                    </form>
                  </div>
                  <!--TODO: ADD a recorded FEEDING-->
                  <!--<form id="formaddfeed">-->
                  <div class="fedRow d-flex justify-content-start">
                    <div class="col-1">&nbsp;</div>
                    <div class="col-1">
                      <el-select v-if="!showButton"
                                 form="formaddfeed"
                                 name="food_type"
                                 v-validate="'required|alpha'" v-model="food_type"
                                 placeholder="FT" :error="getError('food_type')">
                        <el-option value="Choose..." selected>Choose...</el-option>
                        <el-option value="NA" >None / Not Entered</el-option>
                        <el-option value="MN" >Mom (Nursing)</el-option>
                        <el-option value="BO" >Bottle</el-option>
                        <el-option value="BS" >Bottle/Syringe</el-option>
                        <el-option value="SG" >Syringe Gruel</el-option>
                        <el-option value="GG" >Syringe Gruel / Gruel</el-option>
                        <el-option value="G" >Gruel</el-option>
                      </el-select>
                      <span v-if="showButton">&nbsp;</span>
                    </div>
                    <div class="col-1">
                      <fg-input name="weight_before_food"
                                id="weight_before_food"
                                v-if="!showButton && food_type !== 'MN'"
                                form="formaddfeed" v-validate="'required|integer'"
                                v-model="weight_before_food" type="text"
                                placeholder="WBF" :error="getError('requiredText')"
                                v-on:change="fivePercenter"/>
                      <span v-if="showButton"> </span>
                      <div v-if="food_type !== 'G' && food_type !== 'MN' && !showButton" class="form-group">
                        <div id="target_weight_after_food"></div>
                      </div>
                    </div>
                    <div class="col-1">
                      <fg-input v-if="!showButton"
                                form="formaddfeed" name="amount_of_food_taken"
                                v-validate="'required'" v-model="amount_of_food_taken"
                                type="text" placeholder="AFT" :error="getError('amount_of_food_taken')"/>
                      <span v-if="showButton"> </span>
                    </div>
                    <div class="col-1">
                      <fg-input v-if="!showButton"
                                name="weight_after_food" v-model="weight_after_food"
                                v-validate="'required|integer'"  id="weight_after_food"
                                placeholder="WAF" :error="getError('weight_after_food')"/>
                      <span v-if="showButton"> </span>
                    </div>
                    <div class="col-1">
                      <el-select v-if="!showButton" form="formaddfeed" name="stimulated" v-on:change="checkFoodType(food_type)" v-validate="'required|alpha'" v-model="stimulated"  placeholder="ST" :error="getError('stimulated')">
                        <el-option value="Choose..." selected>Choose...</el-option>
                        <el-option value="true">True</el-option>
                        <el-option value="false">False</el-option>
                      </el-select>
                      <span v-if="showButton">&nbsp;</span></div>
                    <div class="col-2 form-group">
                      <!--TODO: move data into data area-->
                      <el-select v-if="!showButton" form="formaddfeed" name="stimulation_type" id="stimulation_type" v-model="stimulation_type" v-validate="'required|alpha'" :error="getError('stimulation_type')" placeholder="STT">
                        <el-option value="Choose..." selected>Choose...</el-option>
                        <el-option value="NA">None / Not Entered</el-option>
                        <el-option value="UR">Urine</el-option>
                        <el-option value="FE">Feces</el-option>
                        <el-option value="UF">Urine/Feces</el-option>
                      </el-select>
                      <span v-if="showButton">&nbsp;</span></div>
                    <div class="col-3 fed-submit-buttons">
                      <button class="btn btn-sm btn-info btn-outline" @click='showButton = !showButton' v-if="showButton">Add</button>
                      <button type="reset" class="btn btn-sm btn-warning" @click='showButton = !showButton' v-if="!showButton">Cancel</button>
                      <!--TODO: make default null values for when "Mom" is selected as Type Of Food taken (TFT)-->
                      <button type="submit" class="btn btn-sm btn-success" v-if="food_type !== 'MN' && !showButton" v-on:click="validateSubmitNoMom(cat.id, cat.name)" @click='showButton = !showButton'>Submit</button>
                      <button type="submit" class="btn btn-sm btn-success" v-if="food_type === 'MN' && !showButton" v-on:click="validateSubmitMom(cat.id, cat.name)">Submit mom</button>
                    </div>
                  </div>
                  <!--</form>-->
                </div>
              </v-tab>
              <v-tab title="Medications">
                <div id="medsTable" class="table table-striped table-bordered" v-if="showRow">
                  <div class="medRow d-flex justify-content-start top-row">
                    <div class="col-1">#</div>
                    <div class="col-2">Name</div>
                    <div class="col-2">Duration</div>
                    <div class="col-1">Freq.</div>
                    <div class="col-1">Dose</div>
                    <div class="col-2">Notes</div>
                    <div class="col-3">Actions</div>
                  </div>
                  <div id="medtable" class="" v-for="med in catMedications" :key="med.id">
                    <form :id="'form'+med.id" @submit.prevent="updateDeleteMedsSubmit(med.id, med.name, cat.id, cat.name)">
                      <div class="medRow d-flex justify-content-start">
                        <div class="col-1">
                          <fg-input v-if="!med.showRow" :form="'form'+med.id" name="id" :value="med.id"></fg-input>
                          <span v-if="med.showRow">{{med.id}}</span>
                        </div>
                        <div class="col-2">
                          <fg-input v-if="!med.showRow" :form="'form'+med.id" name="name" v-validate="'required'" v-model="name" type="text" :placeholder="med.name" :error="getError('requiredText')"></fg-input>
                          <span v-if="med.showRow">{{med.name}}</span>
                        </div>
                        <div class="col-2">
                          <fg-input v-if="!med.showRow" :form="'form'+med.id" name="duration"  v-validate="'required'" v-model="duration" type="text" :placeholder="med.duration" :error="getError('duration')"></fg-input>
                          <span v-if="med.showRow">{{med.duration}}</span>
                        </div>
                        <div class="col-1">
                          <fg-input v-if="!med.showRow" :form="'form'+med.id" name="frequency" v-validate="'required|integer'" v-model="frequency" :error="getError('frequency')" type="text" :placeholder="med.frequency"></fg-input>
                          <span v-if="med.showRow">{{med.frequency}}</span>
                        </div>
                        <div class="col-1">
                          <fg-input v-if="!med.showRow" :form="'form'+med.id" name="dosage" v-validate="'required|integer'" v-model="dosage" :error="getError('dosage')" type="text" :placeholder="med.dosage"></fg-input>
                          <span v-if="med.showRow">{{med.dosage}}</span>
                        </div>
                        <div class="col-2">
                          <fg-input v-if="!med.showRow" :form="'form'+med.id" name="notes" v-model="notes" :error="getError('notes')" type="textarea" :placeholder="med.notes"></fg-input>
                          <span v-if="med.showRow">{{med.notes}}</span>
                        </div>
                        <div class="col-3 d-flex align-items-center cancel-submit">
                          <button class="btn btn-sm btn-warning" @click='med.showRow = !med.showRow' v-if="!med.showRow">Cancel</button>
                          <button type="submit" class="btn btn-sm btn-success"
                                  v-if="!med.showRow" @click="handleAdd(med.id, med.name, 'medicationRow')">Submit</button>

                          <a v-tooltip.top-center="'Edit'" class="btn-warning btn-simple btn-link"
                             @click='med.showRow = !med.showRow' v-if="med.showRow">
                            <i class="fa fa-edit"></i></a>
                          <a v-tooltip.top-center="'Delete'" class="btn-danger btn-simple btn-link" v-if="med.showRow"
                             @click="handleDelete(med.id, med.name, 'medicationRow')">
                            <i class="fa fa-times"></i>
                          </a>

                          <!--<button class="btn btn-sm btn-info" @click='med.showRow = !med.showRow' v-if="med.showRow">Edit</button>-->
                          <!--<button type="submit" class="btn btn-sm btn-danger" v-if="med.showRow" @click="handleDelete(med.id, med.name, 'medicationRow')">Delete</button>-->
                        </div>
                      </div>
                    </form>
                  </div>
                  <!--TODO: add a MEDICATION-->
                  <!--<form id="formadd">-->
                  <div class="medRow d-flex justify-content-start">
                    <div class="col-1">&nbsp;</div>
                    <div class="col-2">
                      <fg-input v-if="!showButton2"
                                form="formadd"
                                name="name"
                                v-validate="'required'" v-model="name"
                                type="text" placeholder="name"
                                :error="getError('requiredText')"></fg-input>
                      <span v-if="showButton2">&nbsp;</span>
                    </div>
                    <div class="col-2">
                      <fg-input v-if="!showButton2"
                                form="formadd" name="duration"
                                v-validate="'required'" v-model="duration"
                                type="text" placeholder="duration" :error="getError('duration')"></fg-input>
                      <span v-if="showButton2">&nbsp;</span>
                    </div>
                    <div class="col-1">
                      <fg-input v-if="!showButton2"
                                form="formadd" name="frequency"
                                v-validate="'required|integer'" v-model="frequency"
                                :error="getError('frequency')" type="text" placeholder="frequency"></fg-input>
                      <span v-if="showButton2">&nbsp;</span>
                    </div>
                    <div class="col-1">
                      <fg-input v-if="!showButton2"
                                form="formadd" name="dosage"
                                v-validate="'required|integer'" v-model="dosage"
                                :error="getError('dosage')" type="text" placeholder="dosage"></fg-input>
                      <span v-if="showButton2">&nbsp;</span>
                    </div>
                    <div class="col-2">
                      <fg-input v-if="!showButton2"
                                form="formadd" name="notes"
                                v-model="notes" :error="getError('notes')"
                                type="textarea" placeholder="notes"></fg-input>
                      <span v-if="showButton2">&nbsp;</span>
                    </div>
                    <div class="col-3 fed-submit-buttons">
                      <button class="btn btn-sm btn-info btn-outline" @click='showButton2 = !showButton2' v-if="showButton2">Add</button>
                      <button type="reset" class="btn btn-sm btn-warning" @click='showButton2 = !showButton2' v-if="!showButton2">Cancel</button>
                      <button type="submit" class="btn btn-sm btn-success" v-if="!showButton2" v-on:click="validateMedicationsBeforeSubmit(cat.id, cat.name)" @click='showButton2 = !showButton2'>Submit</button>
                    </div>
                  </div>
                  <!--</form>-->
                </div>
              </v-tab>
            </vue-tabs>
          </card>
        </b-collapse>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
      name: "GattoInfo"
    }
</script>

<style scoped>

</style>
