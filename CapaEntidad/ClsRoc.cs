using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapaEntidad
{
    public class ClsRoc
    {
        private string _IdRoc;
        private string _Serie;
        private string _Documento;
        private string _Fecha;
        private ClsEmpleado _ObjCajero;
        private ClsCliente _ObjCliente;
        private ClsFactura _ObjFactura;
        private ClsConceptoRoc _ObjConceptoRoc;
        private string _Nota;
        private string _EntraCaja;
        private string _Estado;
        private string _Cantidad;

        public string IdRoc { get => _IdRoc; set => _IdRoc = value; }
        public string Serie { get => _Serie; set => _Serie = value; }
        public string Documento { get => _Documento; set => _Documento = value; }
        public string Fecha { get => _Fecha; set => _Fecha = value; }
        public ClsEmpleado ObjCajero { get => _ObjCajero; set => _ObjCajero = value; }
        public ClsCliente ObjCliente { get => _ObjCliente; set => _ObjCliente = value; }
        public ClsFactura ObjFactura { get => _ObjFactura; set => _ObjFactura = value; }
        public ClsConceptoRoc ObjConceptoRoc { get => _ObjConceptoRoc; set => _ObjConceptoRoc = value; }
        public string Nota { get => _Nota; set => _Nota = value; }
        public string EntraCaja { get => _EntraCaja; set => _EntraCaja = value; }
        public string Estado { get => _Estado; set => _Estado = value; }
        public string Cantidad { get => _Cantidad; set => _Cantidad = value; }

        public ClsRoc()
        {
            this.ObjCajero= new ClsEmpleado();
            this.ObjCliente= new ClsCliente();
            this.ObjFactura= new ClsFactura();  
            this.ObjConceptoRoc= new ClsConceptoRoc();

        }

    }
}
