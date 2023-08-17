export interface ReportState {
  id: number;
  report_id: string;
  form: ReportsForm;
  unit: string;
  client_fullname: string;
  client_birthdate: string;
  client_medical_record_id: string;
  client_gender: Genders;
  department: string;
  subject_incident: IncidentSubjects;
  incident_location: string;
  exact_location: string;
  issued_date: string;
  short_description: string;
  proposal_solution: string;
  performed_treatment: string;
  is_informed: BooleanChoices;
  is_recorded: BooleanChoices;
  is_family_noticed: BooleanChoices;
  is_client_noticed: BooleanChoices;
  incident_classification: IncidentClassification;
  impact_assessment: ImpactAssessment;
  reporter: string; // Assuming user_id is of type string
  observer_1: string;
  observer_2: string;
  title: string[];
  status: string;
  created_at: string;
  updated_at: string;
}

export interface AnalysisState {
  id: number;
  analysis_id: string;
  detailed_description: string;
  incident_type: string;
  treatment_executed: string;
  incident_reason: string;
  solution_executed: string;
  recommendation_incident_prevention: string;
  group_leader_evaluation: string;
  is_aligned_with_reporter: BooleanChoices;
  is_accorded: BooleanChoices;
  client_level: string;
  organization_level: string;
  reported: string; // Assuming user_id is of type string
  created_at: Date;
  updated_at: Date;
}

export enum ReportsForm {
  Voluntary = "Voluntary",
  Required = "Required"

  // Define the structure of the reports_form object if needed
}

export enum Genders {
  Male = "male",
  Female = "female"
}

export enum IncidentSubjects {
  Client = "client",
  Visitor = "visitor",
  Staff = "staff",
  Infrastructure = "infrastructure"
}

export enum BooleanChoices {
  Yes = "yes",
  No = "no",
  NotAcknowledged = "not_acknowledged"
}

export enum IncidentClassification {
  Happen = "happen",
  NotHappen = "not_happen"
}

export enum ImpactAssessment {
  Hard = "hard",
  Medium = "medium",
  Light = "light"
}
