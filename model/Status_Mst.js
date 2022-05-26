class Status_Mst{
    constructor(Id,Name,UpdatedBy,RecordDate,CreatedBy,CreateDate,RowPointer){
        this.Id = Id;
        this.Name = Name;
        this.UpdatedBy = UpdatedBy;
        this.RecordDate = RecordDate;
        this.CreatedBy = CreatedBy;
        this.CreateDate = CreateDate;
        this.RowPointer = RowPointer;
    }
}

module.exports = Status_Mst;
