
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { FileX, Download } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface ExcelExportProps {
  data: Array<{
    nom: string;
    formation: string;
    date: string;
    heures: number;
    statut: string;
  }>;
  filename: string;
  title: string;
  dateFilter?: { from?: Date; to?: Date };
}

export const ExcelExport = ({ data, filename, title, dateFilter }: ExcelExportProps) => {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    setIsExporting(true);
    
    try {
      // Filtrer les données selon la période sélectionnée
      let filteredData = data;
      
      if (dateFilter?.from || dateFilter?.to) {
        filteredData = data.filter(item => {
          const itemDate = new Date(item.date);
          if (dateFilter.from && itemDate < dateFilter.from) return false;
          if (dateFilter.to && itemDate > dateFilter.to) return false;
          return true;
        });
      }

      // Créer le contenu CSV
      const headers = ['Nom', 'Formation', 'Date', 'Heures', 'Statut'];
      const csvContent = [
        headers.join(','),
        ...filteredData.map(row => [
          `"${row.nom}"`,
          `"${row.formation}"`,
          row.date,
          row.heures,
          `"${row.statut}"`
        ].join(','))
      ].join('\n');

      // Créer et télécharger le fichier
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      
      link.setAttribute('href', url);
      link.setAttribute('download', `${filename}_${new Date().toISOString().split('T')[0]}.csv`);
      link.style.visibility = 'hidden';
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast({
        title: "Export réussi",
        description: `${filteredData.length} enregistrement(s) exporté(s)`,
      });
    } catch (error) {
      toast({
        title: "Erreur d'export",
        description: "Une erreur s'est produite lors de l'export",
        variant: "destructive",
      });
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Button
      onClick={handleExport}
      disabled={isExporting || data.length === 0}
      className="bg-green-600 hover:bg-green-700 w-full"
    >
      {isExporting ? (
        <>
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
          Export...
        </>
      ) : (
        <>
          <Download className="h-4 w-4 mr-2" />
          Exporter {title}
        </>
      )}
    </Button>
  );
};
