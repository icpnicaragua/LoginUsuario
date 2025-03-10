using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapaEntidad
{
    public class ClsEmpresa
    {
        private string _IdEmpresa;
        private string _NombreComercial;
        private string _RazonSocial;
        private string _Ruc;
        private string _Estado;
        private ClsTipoEmpresa _ObjTipoEmpresa;

        public string IdEmpresa { get => _IdEmpresa; set => _IdEmpresa = value; }
        public string NombreComercial { get => _NombreComercial; set => _NombreComercial = value; }
        public string RazonSocial { get => _RazonSocial; set => _RazonSocial = value; }
        public string Ruc { get => _Ruc; set => _Ruc = value; }
        public string Estado { get => _Estado; set => _Estado = value; }
        public ClsTipoEmpresa ObjTipoEmpresa { get => _ObjTipoEmpresa; set => _ObjTipoEmpresa = value; }

        public ClsEmpresa() {
            this.ObjTipoEmpresa = new ClsTipoEmpresa();
        }
    }
}
