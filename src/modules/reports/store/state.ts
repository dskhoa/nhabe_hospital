import { defineStore } from 'pinia'
import {
  BooleanChoices,
  Genders,
  ImpactAssessment,
  IncidentClassification,
  IncidentSubjects,
  ReportsForm,
  ReportState,
} from './types'

export const useReportStore = defineStore('report', {
  state: () => ({
    reportState: {} as ReportState,
  }),
  actions: {
    saveReportState(form: any) {
      this.reportState = {
        id: 1,
        report_id: form.reportId,
        form: ReportsForm.required,
        unit: '', // Assign the appropriate value
        client_fullname: form.name,
        client_birthdate: form.birthdate,
        client_medical_record_id: form.num_medical,
        client_gender: Genders[form.gender],
        department: '', // Assign the appropriate value
        subject_incident: IncidentSubjects[form.subject_incident],
        incident_location: form.incident_location,
        exact_location: form.exact_location,
        issued_date: form.issued_date,
        short_description: form.short_description,
        proposal_solution: form.proposal_solution,
        performed_treatment: form.performed_treatment,
        is_informed: BooleanChoices[form.is_informed],
        is_recorded: BooleanChoices[form.is_recorded],
        is_family_noticed: BooleanChoices[form.is_family_noticed],
        is_client_noticed: BooleanChoices[form.is_client_noticed],
        incident_classification: IncidentClassification[form.incident_classification],
        impact_assessment: ImpactAssessment[form.impact_classification],
        reporter: form.report.name, // Assuming user_id is the name of the reporter
        observer_1: form.observer_1,
        observer_2: form.observer_2,
        title: form.title.value,
        status: 'đang xử lý', // Assign the appropriate value
        created_at: form.created_at.toISOString(),
        updated_at: form.updated_at.toISOString(),
      }
    },
    clearReportState() {
      this.reportState = {} as ReportState
    },
  },
})

export const analysisState = defineStore({
  id: 'analysis.state',
  state: (): { recommendation_incident_prevention: string; incident_type: string; organization_level: string; created_at: undefined; analysis_id: string; client_level: string; solution_executed: string; detailed_description: string; treatment_executed: string; updated_at: undefined; is_accorded: undefined; reported: string; incident_reason: string; id: number; group_leader_evaluation: string; is_aligned_with_reporter: undefined } => {
    return {
      analysis_id: '',
      client_level: '',
      created_at: undefined,
      detailed_description: '',
      group_leader_evaluation: '',
      id: 0,
      incident_reason: '',
      incident_type: '',
      is_accorded: undefined,
      is_aligned_with_reporter: undefined,
      organization_level: '',
      recommendation_incident_prevention: '',
      reported: '',
      solution_executed: '',
      treatment_executed: '',
      updated_at: undefined,

    }
  },
})

export const usePaginationStore = defineStore('response', {
  state: () => ({
    totalObjects: 25,
    perPage: 20,
    currentPage: 2,
    nextPage: null,
    previousPage: 1,
  }),
  actions: {
    goToNextPage() {
      if (this.nextPage !== null) {
        // Logic to navigate to the next page
        // Example: router.push(`/page/${this.nextPage}`);
      }
    },
    goToPreviousPage() {
      if (this.previousPage !== null) {
        // Logic to navigate to the previous page
        // Example: router.push(`/page/${this.previousPage}`);
      }
    },
    getState() {
      return {
        totalObjects: this.totalObjects,
        perPage: this.perPage,
        currentPage: this.currentPage,
        nextPage: this.nextPage,
        previousPage: this.previousPage,
      };
    },
  },
});
