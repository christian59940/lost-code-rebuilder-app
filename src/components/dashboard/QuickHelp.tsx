
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { HelpCircle } from 'lucide-react';

export const QuickHelp = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <HelpCircle className="h-5 w-5" />
          Aide Rapide
        </CardTitle>
        <CardDescription>
          Questions fréquemment posées sur la gestion des sessions
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="signatures">
            <AccordionTrigger>Comment demander des signatures ?</AccordionTrigger>
            <AccordionContent>
              Cliquez sur le bouton "Signature matin" ou "Signature après-midi" sur la carte de session correspondante. 
              Une demande sera envoyée automatiquement aux participants.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="attendance">
            <AccordionTrigger>Comment gérer les présences ?</AccordionTrigger>
            <AccordionContent>
              Utilisez le bouton "Présences" sur chaque session pour marquer les participants comme présents, 
              absents ou en retard. Vous pouvez également noter les minutes de retard.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="status">
            <AccordionTrigger>Que signifient les différents statuts ?</AccordionTrigger>
            <AccordionContent>
              <ul className="list-disc pl-4 space-y-1">
                <li><strong>Programmée :</strong> Session planifiée mais pas encore commencée</li>
                <li><strong>En cours :</strong> Session actuellement en déroulement</li>
                <li><strong>Terminée :</strong> Session achevée avec succès</li>
                <li><strong>Annulée :</strong> Session annulée</li>
              </ul>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="stats">
            <AccordionTrigger>Comment interpréter les statistiques ?</AccordionTrigger>
            <AccordionContent>
              Les statistiques affichent pour chaque période (matin/après-midi) :
              <ul className="list-disc pl-4 mt-2 space-y-1">
                <li>✓ Nombre de présents</li>
                <li>⏰ Nombre de retardataires</li>
                <li>✗ Nombre d'absents</li>
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
};
