import { defineStore } from 'pinia'
import { ReportState, AnalysisState } from './types'

export const reportState = defineStore({
  id: 'report.state',
  state: (): { short_description: string; is_client_noticed: undefined; is_family_noticed: undefined; created_at: undefined; performed_treatment: string; title: string; incident_classification: undefined; issued_date: undefined; updated_at: undefined; id: number; client_fullname: string; department: string; subject_incident: undefined; exact_location: string; proposal_solution: string; is_informed: undefined; is_recorded: undefined; reporter: string; client_medical_record_id: string; impact_assessment: undefined; client_birthdate: undefined; incident_location: string; unit: string; form: undefined; observer_1: string; report_id: string; observer_2: string; client_gender: undefined; status: string } => {
    return {
      client_birthdate: undefined,
      client_fullname: "",
      client_gender: undefined,
      client_medical_record_id: "",
      created_at: undefined,
      department: "",
      exact_location: "",
      form: undefined,
      id: 0,
      impact_assessment: undefined,
      incident_classification: undefined,
      incident_location: "",
      is_client_noticed: undefined,
      is_family_noticed: undefined,
      is_informed: undefined,
      is_recorded: undefined,
      issued_date: undefined,
      observer_1: "",
      observer_2: "",
      performed_treatment: "",
      proposal_solution: "",
      report_id: "",
      reporter: "",
      short_description: "",
      status: "",
      subject_incident: undefined,
      title: "",
      unit: "",
      updated_at: undefined
    }
  },
})

export const analysisState = defineStore({
  id: 'analysis.state',
  state: (): { recommendation_incident_prevention: string; incident_type: string; organization_level: string; created_at: undefined; analysis_id: string; client_level: string; solution_executed: string; detailed_description: string; treatment_executed: string; updated_at: undefined; is_accorded: undefined; reported: string; incident_reason: string; id: number; group_leader_evaluation: string; is_aligned_with_reporter: undefined } => {
    return {
      analysis_id: "",
      client_level: "",
      created_at: undefined,
      detailed_description: "",
      group_leader_evaluation: "",
      id: 0,
      incident_reason: "",
      incident_type: "",
      is_accorded: undefined,
      is_aligned_with_reporter: undefined,
      organization_level: "",
      recommendation_incident_prevention: "",
      reported: "",
      solution_executed: "",
      treatment_executed: "",
      updated_at: undefined

    }
  }
})
