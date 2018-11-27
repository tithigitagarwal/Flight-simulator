export class SearchResult {
    constructor(
        public origin: string,
        public destination: string,
        public startDate: Date,
        public totalPassenger: number,
        public endDate?: Date,
    ) {}
}