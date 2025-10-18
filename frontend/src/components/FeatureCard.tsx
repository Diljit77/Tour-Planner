interface Props { icon: React.ReactNode; title: string; text: string; }
export default function FeatureCard({ icon, title, text }: Props) {
return (
<div className="bg-card rounded-xl shadow-md p-6 text-center hover:shadow-xl transition-all">
<div className="text-primary mb-4 flex justify-center">{icon}</div>
<h3 className="font-heading font-semibold text-lg mb-2">{title}</h3>
<p className="text-textSecondary text-sm">{text}</p>
</div>
);
}